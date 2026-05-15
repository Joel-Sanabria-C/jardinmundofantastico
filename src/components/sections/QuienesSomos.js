'use client'
import { motion } from 'framer-motion'

const VALORES = [
  { icon: '💙', title: 'Amor',        desc: 'Ambiente cálido y seguro',   color: '#2196F3' },
  { icon: '💛', title: 'Respeto',     desc: 'Cada niño es único',          color: '#FFD600' },
  { icon: '💡', title: 'Aprendizaje', desc: 'Metodología lúdica',          color: '#FF8C00' },
]

export default function QuienesSomos() {
  return (
    <section id="nosotros" className="bg-blue-gradient py-20 md:py-28 relative overflow-hidden">

      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="relative rounded-3xl overflow-hidden border-3 border-white/25
                            shadow-card-lg">
              {/* Photo placeholder — replace with <Image /> */}
              <div className="w-full h-72 md:h-[360px] bg-gradient-to-br from-brand-blue-mid to-brand-blue-lt
                              flex flex-col items-center justify-center gap-3">
                <span className="text-8xl">🏫</span>
                <p className="text-white/60 font-body text-sm font-semibold">
                  Foto instalaciones
                </p>
              </div>

              {/* Year badge */}
              <motion.div
                className="absolute bottom-4 right-4 bg-brand-yellow rounded-2xl px-4 py-2
                           shadow-glow-y"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="font-display text-brand-blue text-2xl leading-none">+15</p>
                <p className="font-body text-brand-blue text-xs font-bold">años de experiencia</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          >
            <h2 className="font-display text-4xl md:text-5xl text-white text-shadow mb-4">
              Quiénes Somos
            </h2>
            <p className="font-body text-white/80 text-base md:text-lg leading-relaxed mb-8">
              Desde hace más de 15 años, el Jardín Infantil Mundo Fantástico ha sido el
              hogar de muchas familias en Bogotá. Creemos que la infancia es el momento
              más importante del desarrollo humano.
            </p>

            {/* Valores */}
            <div className="space-y-3">
              {VALORES.map((v, i) => (
                <motion.div
                  key={v.title}
                  className="valor-card"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.12, duration: 0.5 }}
                  whileHover={{ x: 8, backgroundColor: 'rgba(255,255,255,0.18)' }}
                >
                  <motion.span
                    className="text-3xl flex-shrink-0"
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.7 }}
                  >
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
