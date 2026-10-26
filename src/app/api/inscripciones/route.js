// ─────────────────────────────────────────────────────────────
//  POST /api/inscripciones
//  Recibe el formulario de inscripción y lo envía por correo
//  usando Resend (https://resend.com). No usa base de datos.
//
//  Variables de entorno (.env.local y Vercel):
//    RESEND_API_KEY    → clave de Resend (re_...)
//    CORREO_DESTINO    → correo del jardín que recibe las solicitudes
//    CORREO_REMITENTE  → remitente; sin dominio propio usar onboarding@resend.dev
// ─────────────────────────────────────────────────────────────
import { NextResponse } from 'next/server'

const RESEND_URL = 'https://api.resend.com/emails'

const escapar = (v = '') =>
  String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const limpiar = (v, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

async function enviarCorreo({ to, subject, html, replyTo }) {
  const res = await fetch(RESEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Mundo Fantástico <${process.env.CORREO_REMITENTE || 'onboarding@resend.dev'}>`,
      to: [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  })
  if (!res.ok) {
    const detalle = await res.text().catch(() => '')
    throw new Error(`Resend ${res.status}: ${detalle}`)
  }
  return res.json()
}

function fila(label, valor) {
  if (!valor) return ''
  return `
    <tr>
      <td style="padding:10px 14px;background:#FFF8ED;font-weight:700;color:#1A237E;width:40%;border-bottom:1px solid #f0e6d6">${label}</td>
      <td style="padding:10px 14px;color:#333;border-bottom:1px solid #f0e6d6">${escapar(valor)}</td>
    </tr>`
}

function plantillaJardin(d) {
  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border-radius:16px;overflow:hidden;border:1px solid #eee">
    <div style="background:linear-gradient(135deg,#1A237E,#283593);padding:28px;text-align:center">
      <h1 style="color:#FFD600;margin:0;font-size:24px">🌟 Nueva solicitud de inscripción</h1>
      <p style="color:#ffffffcc;margin:8px 0 0">Recibida desde la página web</p>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${fila('Nombre del niño/a', d.nombre_nino)}
      ${fila('Edad', d.edad_nino)}
      ${fila('Nivel de interés', d.nivel_interes)}
      ${fila('Acudiente', d.nombre_acudiente)}
      ${fila('Teléfono', d.telefono)}
      ${fila('Correo', d.correo)}
      ${fila('Mensaje', d.mensaje)}
    </table>
    <div style="padding:18px;text-align:center;background:#fafafa">
      <a href="https://wa.me/57${escapar(d.telefono.replace(/\D/g, '').replace(/^57/, ''))}"
         style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:10px 22px;border-radius:999px;font-weight:700">
        💬 Responder por WhatsApp
      </a>
    </div>
  </div>`
}

function plantillaAcudiente(d) {
  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border-radius:16px;overflow:hidden;border:1px solid #eee">
    <div style="background:linear-gradient(135deg,#D32F2F,#B71C1C);padding:28px;text-align:center">
      <h1 style="color:#fff;margin:0;font-size:24px">¡Gracias, ${escapar(d.nombre_acudiente)}! 🎈</h1>
    </div>
    <div style="padding:24px;color:#333;font-size:15px;line-height:1.6">
      <p>Recibimos tu solicitud de inscripción para <strong>${escapar(d.nombre_nino)}</strong>.</p>
      <p>Nuestro equipo se pondrá en contacto contigo en menos de 24 horas al número <strong>${escapar(d.telefono)}</strong>.</p>
      <p style="margin-top:24px">Con cariño,<br/><strong style="color:#1A237E">Jardín Infantil Mundo Fantástico</strong><br/>Suba Bilbao, Bogotá</p>
    </div>
  </div>`
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}))

    // Anti-spam: campo oculto que solo llenan los bots
    if (body.sitio_web) return NextResponse.json({ success: true }, { status: 200 })

    const datos = {
      nombre_nino:      limpiar(body.nombre_nino, 120),
      edad_nino:        limpiar(body.edad_nino, 40),
      nombre_acudiente: limpiar(body.nombre_acudiente, 120),
      telefono:         limpiar(body.telefono, 30),
      correo:           limpiar(body.correo, 160),
      nivel_interes:    limpiar(body.nivel_interes, 60),
      mensaje:          limpiar(body.mensaje, 1500),
    }

    if (!datos.nombre_nino || !datos.nombre_acudiente || !datos.telefono) {
      return NextResponse.json(
        { success: false, error: 'Completa el nombre del niño, del acudiente y el teléfono.' },
        { status: 400 }
      )
    }
    if (datos.telefono.replace(/\D/g, '').length < 7) {
      return NextResponse.json({ success: false, error: 'El teléfono no parece válido.' }, { status: 400 })
    }
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo)
    if (datos.correo && !correoValido) {
      return NextResponse.json({ success: false, error: 'El correo no parece válido.' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY || !process.env.CORREO_DESTINO) {
      console.error('Faltan RESEND_API_KEY o CORREO_DESTINO en las variables de entorno')
      return NextResponse.json(
        { success: false, error: 'El formulario no está configurado. Escríbenos por WhatsApp.' },
        { status: 500 }
      )
    }

    // 1) Correo al jardín (obligatorio)
    await enviarCorreo({
      to: process.env.CORREO_DESTINO,
      subject: `Nueva inscripción: ${datos.nombre_nino} (${datos.nivel_interes || 'sin nivel'})`,
      html: plantillaJardin(datos),
      replyTo: correoValido ? datos.correo : undefined,
    })

    // 2) Confirmación al acudiente (opcional: si falla, no bloquea)
    if (correoValido) {
      try {
        await enviarCorreo({
          to: datos.correo,
          subject: 'Recibimos tu solicitud — Jardín Infantil Mundo Fantástico',
          html: plantillaAcudiente(datos),
        })
      } catch (e) {
        console.warn('No se pudo enviar la confirmación al acudiente:', e.message)
      }
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Error en /api/inscripciones:', error)
    return NextResponse.json(
      { success: false, error: 'No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp.' },
      { status: 500 }
    )
  }
}
