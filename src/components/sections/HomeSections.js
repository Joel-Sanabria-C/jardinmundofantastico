'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

// ── NIVELES ────────────────────────────────────────────────────
const NIVELES = [
  { icon:'🐣', name:'Párvulos',   year:'1° Primer año',  color:'#FFD600' },
  { icon:'🎨', name:'Transición', year:'2° Segundo año', color:'#FF8C00' },
  { icon:'🤓', name:'Transición', year:'3° Tercer año',  color:'#4CAF50' },
  { icon:'📚', name:'Transición', year:'4° Cuarto año',  color:'#2196F3' },
  { icon:'🔭', name:'Transición', year:'5° Quinto año',  color:'#9C27B0' },
]

export function Niveles() {
  return (
    <section id="servicios" className="bg-white py-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {NIVELES.map((n, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.1 }}
              whileHover={{ y:-6, scale:1.03 }}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2
                         border-gray-100 cursor-default transition-all duration-300
                         hover:border-brand-yellow hover:shadow-card">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-sm"
                   style={{ background:`${n.color}22`, border:`2px solid ${n.color}55` }}>
                {n.icon}
              </div>
              <p className="font-display text-brand-blue text-base text-center leading-tight">{n.name}</p>
              <p className="font-body text-gray-500 text-xs font-semibold text-center">{n.year}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── QUIÉNES SOMOS ──────────────────────────────────────────────
const VALORES = [
  { icon:'💙', title:'Amor',        desc:'Ambiente cálido y seguro' },
  { icon:'💛', title:'Respeto',     desc:'Cada niño es único' },
  { icon:'💡', title:'Aprendizaje', desc:'Metodología lúdica' },
]

export function QuienesSomos({ homeImages }) {
  // homeImages viene de getHomeImages() → { hero, quienessomos, todas }
  const fotoQuienes = homeImages?.quienessomos ?? null

  return (
    <section id="nosotros-preview" className="bg-blue-gradient py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5
                      -translate-y-1/3 translate-x-1/3 pointer-events-none"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Foto quiénes somos */}
          <motion.div initial={{ opacity:0, x:-50 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.7 }}>
            <div className="relative rounded-3xl overflow-hidden border-4 border-white/25 shadow-card-lg">
              {fotoQuienes?.publicUrl ? (
                <div className="relative w-full h-72 md:h-[360px]">
                  <Image
                    src={fotoQuienes.publicUrl}
                    alt="Quiénes somos — Mundo Fantástico"
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                </div>
              ) : (
                <div className="w-full h-72 md:h-[360px] bg-gradient-to-br
                                from-brand-blue-mid to-blue-700 flex flex-col
                                items-center justify-center gap-3">
                  <span className="text-8xl">🏫</span>
                  <p className="text-white/60 font-body text-sm font-semibold">
                    Sube quienessomos.png a imagenes/home/
                  </p>
                </div>
              )}
              <motion.div
                className="absolute bottom-4 right-4 bg-brand-yellow rounded-2xl
                           px-4 py-2 shadow-glow-y"
                animate={{ y:[0,-5,0] }} transition={{ duration:3, repeat:Infinity }}>
                <p className="font-display text-brand-blue text-2xl leading-none">+15</p>
                <p className="font-body text-brand-blue text-xs font-bold">años de experiencia</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Texto */}
          <motion.div initial={{ opacity:0, x:50 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.7, delay:0.15 }}>
            <h2 className="font-display text-4xl md:text-5xl text-white text-shadow mb-4">
              Quiénes Somos
            </h2>
            <p className="font-body text-white/80 text-base md:text-lg leading-relaxed mb-8">
              Desde hace más de 15 años, el Jardín Infantil Mundo Fantástico ha sido
              el hogar de muchas familias en Bogotá. Creemos que la infancia es el
              momento más importante del desarrollo humano.
            </p>
            <div className="space-y-3">
              {VALORES.map((v, i) => (
                <motion.div key={v.title} className="valor-card"
                  initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }} transition={{ delay:0.1+i*0.12 }}>
                  <motion.span className="text-3xl flex-shrink-0"
                    animate={{ rotate:[0,8,-8,0] }}
                    transition={{ duration:2, repeat:Infinity, delay:i*0.7 }}>
                    {v.icon}
                  </motion.span>
                  <div>
                    <p className="font-display text-white text-lg leading-none mb-0.5">{v.title}</p>
                    <p className="font-body text-white/60 text-sm">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── METODOLOGÍA ────────────────────────────────────────────────
const METODOS = [
  { icon:'🎮', title:'¡Hello Friends!',     desc:'Enseñamos bases de Inglés para que los niños reconozcan la segunda lengua.',                                      accent:'#FFD600' },
  { icon:'🧮', title:'¿Cuánto es 20 − 12?', desc:'Sentamos las bases de la lógica matemática que aplicamos en la vida diaria.',                                    accent:'#FF8C00' },
  { icon:'📖', title:'"Había una vez..."',   desc:'Enseñamos la comprensión lectora para que conozcan las aventuras de los libros.',                                 accent:'#4CAF50' },
  { icon:'😊', title:'Por favor y gracias',  desc:'Proporcionamos un ambiente seguro que fortalece la autoestima, el respeto y el amor por el otro.',               accent:'#2196F3' },
]

export function Metodologia() {
  return (
    <section id="metodologia" className="bg-red-gradient py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div className="mb-14" initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <h2 className="font-display text-4xl md:text-5xl text-white text-shadow mb-2">
            Nuestra Metodología
          </h2>
          <p className="font-body text-white/70 font-semibold">
            Enseñamos con aprendizaje, juego y mucho amor a Dios.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {METODOS.map((m, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.1 }}
              whileHover={{ y:-8 }}
              className="bg-white/12 border border-white/20 rounded-2xl p-6
                         backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              <motion.div className="w-14 h-14 rounded-2xl flex items-center
                                     justify-content-center text-3xl mb-4"
                style={{ background:`${m.accent}33`, border:`2px solid ${m.accent}55`,
                         display:'flex', alignItems:'center', justifyContent:'center' }}
                animate={{ rotate:[0,5,-5,0] }}
                transition={{ duration:3, repeat:Infinity, delay:i*0.5 }}>
                {m.icon}
              </motion.div>
              <h3 className="font-display text-white text-xl mb-2">{m.title}</h3>
              <p className="font-body text-white/72 text-sm leading-relaxed">{m.desc}</p>
              <motion.div className="mt-4 h-0.5 rounded-full opacity-50"
                style={{ background:m.accent }}
                initial={{ scaleX:0 }} whileInView={{ scaleX:1 }}
                viewport={{ once:true }} transition={{ delay:0.3+i*0.1 }}/>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
