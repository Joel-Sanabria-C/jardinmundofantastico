'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MapPin, Phone, MessageCircle, Mail, CheckCircle, Loader2 } from 'lucide-react'

const INIT = { nombre_nino:'', edad_nino:'', nombre_acudiente:'', telefono:'', correo:'', nivel_interes:'', mensaje:'', sitio_web:'' }
const NIVELES = ['Párvulos (1°)','Transición (2°)','Transición (3°)','Transición (4°)','Transición (5°)']
const INFO = [
  { icon:<MapPin size={18}/>,       label:'Dirección',  value:'Calle 142A #14J0-15, Ciudadela Cafam II Superlote 6', color:'#D32F2F' },
  { icon:<Phone size={18}/>,        label:'Teléfono',   value:'+57 320 3017208',  color:'#FFD600' },
  { icon:<MessageCircle size={18}/>, label:'WhatsApp',  value:'320 3017208',  color:'#25D366' },
  { icon:<Mail size={18}/>,         label:'Email',      value:'mundofantasticojardininfantil@gmail.com', color:'#2196F3' },
]

export default function Contacto() {
  const [form,   setForm]   = useState(INIT)
  const [status, setStatus] = useState('idle')
  const [errMsg, setErrMsg] = useState('')

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    setErrMsg('')
    try {
      const res  = await fetch('/api/inscripciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.success) throw new Error(data.error || 'Error al enviar. Intenta de nuevo.')
      setStatus('success')
      setForm(INIT)
    } catch(err) {
      setStatus('error')
      setErrMsg(err?.message || 'Error al enviar. Intenta de nuevo.')
    }
  }

  const lbl = 'block text-white/65 text-xs font-bold font-body mb-1.5 uppercase tracking-wide'

  return (
    <section id="contacto" className="bg-contact-gradient py-20 md:py-28 relative overflow-hidden">
      {[...Array(3)].map((_,i) => (
        <motion.div key={i} className="absolute rounded-full bg-white/5 pointer-events-none"
          style={{ width:80+i*50, height:80+i*50, top:`${10+i*25}%`, right:`${2+i*4}%` }}
          animate={{ y:[0,-20,0] }} transition={{ duration:5+i, repeat:Infinity, delay:i*0.8 }} />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div className="mb-12" initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
          <h2 className="font-display text-4xl md:text-5xl text-white text-shadow mb-2">¿Listo para inscribir a tu hijo?</h2>
          <p className="font-body text-white/65 text-base font-semibold">Completa el formulario y nos ponemos en contacto contigo en menos de 24 horas.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
          {/* Form */}
          <motion.div className="bg-white/8 border border-white/15 rounded-3xl p-6 md:p-8 backdrop-blur-sm"
            initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
            {status === 'success' ? (
              <motion.div className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ type:'spring' }}>
                <CheckCircle size={60} className="text-green-400" />
                <h3 className="font-display text-white text-2xl">¡Solicitud enviada!</h3>
                <p className="font-body text-white/70 text-sm">Nos contactaremos pronto. 🌟</p>
                <button onClick={() => setStatus('idle')} className="mt-2 text-white/50 text-xs underline hover:text-white">Enviar otra</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Campo trampa anti-spam: invisible para personas */}
                <input type="text" name="sitio_web" value={form.sitio_web} onChange={handleChange} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden"/>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={lbl}>Nombre del niño/a</label><input className="input-mf" name="nombre_nino" value={form.nombre_nino} onChange={handleChange} placeholder="Nombre del niño" required/></div>
                  <div><label className={lbl}>Edad del niño/a</label><input className="input-mf" name="edad_nino" value={form.edad_nino} onChange={handleChange} placeholder="Ej. 3 años"/></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={lbl}>Nombre del acudiente</label><input className="input-mf" name="nombre_acudiente" value={form.nombre_acudiente} onChange={handleChange} placeholder="Nombre completo" required/></div>
                  <div><label className={lbl}>Teléfono de contacto</label><input className="input-mf" name="telefono" type="tel" value={form.telefono} onChange={handleChange} placeholder="3XXXXXXXXX" required/></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={lbl}>Correo electrónico</label><input className="input-mf" name="correo" type="email" value={form.correo} onChange={handleChange} placeholder="correo@ejemplo.com"/></div>
                  <div><label className={lbl}>Nivel de interés</label>
                    <select className="input-mf [&>option]:text-gray-900" name="nivel_interes" value={form.nivel_interes} onChange={handleChange}>
                      <option value="">Selecciona un nivel</option>
                      {NIVELES.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
                <div><label className={lbl}>Mensaje (opcional)</label><textarea className="input-mf resize-none" name="mensaje" rows={3} value={form.mensaje} onChange={handleChange} placeholder="Escribe tu mensaje..."/></div>
                {status === 'error' && <p className="text-red-300 text-xs font-body font-semibold">⚠️ {errMsg}</p>}
                <motion.button type="submit" disabled={status==='loading'}
                  className="inline-flex items-center gap-2 bg-brand-red text-white font-display text-lg px-8 py-3.5 rounded-full shadow-glow-r disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
                  whileHover={{ scale:status!=='loading'?1.04:1, y:-2 }} whileTap={{ scale:0.97 }}>
                  {status==='loading' ? <><Loader2 size={20} className="animate-spin"/>Enviando...</> : <><Send size={18}/>Enviar solicitud</>}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.15 }}>
            <div className="bg-white/8 border border-white/15 rounded-3xl p-6 backdrop-blur-sm mb-4">
              <h5 className="font-display text-brand-yellow text-xl mb-5">También puedes contactarnos:</h5>
              <div className="space-y-4">
                {INFO.map((item,i) => (
                  <motion.div key={i} className="flex items-start gap-3 pb-4 border-b border-white/10 last:border-0 last:pb-0"
                    initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.2+i*0.1 }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:`${item.color}33`, color:item.color }}>{item.icon}</div>
                    <div><p className="font-body text-white text-sm font-bold mb-0.5">{item.label}</p><p className="font-body text-white/55 text-xs [overflow-wrap:anywhere]">{item.value}</p></div>
                  </motion.div>
                ))}
              </div>
              <div className="flex gap-2 mt-5">
                {[{label:'Instagram',emoji:'📸',cls:'bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888]'},
                  {label:'Facebook', emoji:'👍', cls:'bg-[#1877F2]'},
                  {label:'WhatsApp', emoji:'💬', cls:'bg-[#25D366]'}].map(s => (
                  <motion.a key={s.label} href="#" className={`${s.cls} text-white text-xs rounded-xl px-3 py-2 font-body font-bold flex items-center gap-1`} whileHover={{ scale:1.05, y:-2 }}>
                    <span>{s.emoji}</span><span>{s.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
            <div className="bg-white/8 border border-white/15 rounded-3xl overflow-hidden">
              <div className="h-36 bg-gradient-to-br from-brand-blue-mid to-blue-900 flex items-center justify-center gap-2 text-white/60 font-body text-sm">
                <MapPin size={18}/><span className="font-semibold">Mapa — próximamente</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
