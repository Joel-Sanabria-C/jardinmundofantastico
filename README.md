# 🌟 Mundo Fantástico — Jardín Infantil

Next.js 14 · React 18 · Tailwind CSS · Framer Motion · Resend

---

## 🗂️ Páginas incluidas

| Ruta           | Descripción |
|----------------|-------------|
| `/`            | Inicio: Hero, Niveles, Quiénes somos, Metodología (resumen), Contacto |
| `/nosotros`    | Nosotros: Hero, Objetivos, Visión, Misión, Contacto |
| `/servicios`   | Servicios: Hero, Niveles educativos, Qué incluye, Entorno seguro, Proceso de inscripción, Contacto |
| `/metodologia` | Metodología: Hero, Enfoque, Pilares, Ciclo de aprendizaje, Un día en el jardín, Contacto |

> Esta versión **no usa Supabase** ni galería. Las fotos van en `public/images/`
> y el formulario envía correos con **Resend**.

---

## 🚀 Instalación local

```bash
npm install
cp .env.local.example .env.local   # → edita con tu clave de Resend
npm run dev                         # → http://localhost:3000
```

---

## ✉️ Formulario de inscripción (Resend)

Al enviar el formulario, `/api/inscripciones`:
1. Envía un correo al jardín (`CORREO_DESTINO`) con los datos y un botón para responder por WhatsApp.
2. Envía una confirmación al acudiente si escribió su correo.

Variables en `.env.local` (y en Vercel → Settings → Environment Variables):

| Variable | Valor |
|----------|-------|
| `RESEND_API_KEY`   | `re_...` (resend.com → API Keys) |
| `CORREO_DESTINO`   | `mundofantasticojardininfantil@gmail.com` |
| `CORREO_REMITENTE` | `onboarding@resend.dev` |

⚠️ Con `onboarding@resend.dev`, Resend **solo entrega a la dirección con la que se creó la cuenta de Resend**.
Por eso `CORREO_DESTINO` debe ser ese mismo correo. La confirmación al acudiente no llegará
hasta verificar un dominio propio en Resend (resend.com → Domains) y cambiar `CORREO_REMITENTE`
a algo como `inscripciones@tudominio.com`. El correo al jardín funciona igual.

El formulario incluye un campo oculto anti-spam y validación de teléfono y correo.

---

## 🖼️ Fotos del sitio

Copia las fotos con estos nombres exactos (jpg, jpeg, png o webp). Si un archivo
no existe, se muestra el placeholder con emoji.

```
public/images/
├── nosotros/hero.jpg        ← Hero de Nosotros
├── nosotros/objetivos.jpg   ← Sección Objetivos
├── nosotros/vision.jpg      ← Fondo de Visión
├── nosotros/mision.jpg      ← Sección Misión
├── metodologia/hero.jpg     ← Hero de Metodología
├── metodologia/aula.jpg     ← Foto de "Nuestro enfoque"
├── servicios/hero.jpg       ← Hero de Servicios
└── servicios/instalaciones.jpg ← Foto de "Un entorno seguro"
```

Después de agregar fotos, vuelve a desplegar (o reinicia `npm run dev`).

---

## ☁️ Desplegar en Vercel

1. Sube el proyecto a GitHub.
2. En [vercel.com](https://vercel.com) → **Add New Project** → importa el repositorio (Next.js se detecta solo).
3. En **Environment Variables** agrega `RESEND_API_KEY`, `CORREO_DESTINO` y `CORREO_REMITENTE`.
4. **Deploy** ✅

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── layout.js                    ← Layout raíz (fuentes, metadata)
│   ├── page.js                      ← Inicio (/)
│   ├── nosotros/page.js             ← /nosotros
│   ├── servicios/page.js            ← /servicios
│   ├── metodologia/page.js          ← /metodologia
│   └── api/inscripciones/route.js   ← Envío del formulario por correo
├── components/
│   ├── layout/        Navbar.js, Footer.js
│   └── sections/
│       ├── Hero.js, HomeSections.js, Contacto.js
│       ├── nosotros/NosotrosSections.js
│       ├── servicios/ServiciosSections.js
│       └── metodologia/MetodologiaSections.js
├── lib/               images.js, utils.js
└── styles/globals.css
```
