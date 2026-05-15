'use client'
import { motion } from 'framer-motion'

const METODOS = [
  {
    icon: '🎮',
    title: '¡Hello Friends!',
    desc: 'Enseñamos bases de Inglés para que los niños reconozcan la segunda lengua.',
    accent: '#FFD600',
  },
  {
    icon: '🧮',
    title: '¿Cuánto es 20 − 12?',
    desc: 'Sentamos las bases de la lógica matemática que aplicamos en la vida diaria.',
    accent: '#FF8C00',
  },
  {
    icon: '📖',
    title: '"Había una vez..."',
    desc: 'Enseñamos y practicamos la comprensión lectora para que conozcan solo las aventuras de los libros.',
    accent: '#4CAF50',
  },
  {
    icon: '😊',
    title: 'Por favor y gracias',
    desc: 'Proporcionamos un ambiente seguro que fortalece la autoestima, el respeto y el amor por el otro.',
    accent: '#2196F3',
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function Metodologia() {
  return (
    <section id="metodologia" className="bg-red-gradient py-20 md:py-28 relative overflow-hidden">

      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3 pointer-events-none blur-2xl" />
      <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-black/10 translate-y-1/2 -translate-x-1/4 pointer-events-none blur-2xl" />

      {/* Floating stars */}
      {['⭐','✨','🌟'].map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl pointer-events-none opacity-30 select-none"
          style={{ top: `${20 + i * 25}%`, left: `${5 + i * 5}%` }}
          animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
        >
          {s}
        </motion.span>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-white text-shadow mb-2">
            Nuestra Metodología
          </h2>
          <p className="font-body text-white/70 text-base font-semibold">
            Enseñamos con aprendizaje, juego y mucho amor a Dios.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {METODOS.map((m, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white/12 border border-white/20 rounded-2xl p-6
                         backdrop-blur-sm cursor-default group
                         hover:bg-white/20 transition-all duration-300"
            >
              {/* Icon */}
              <motion.div
                className="w-14 h-14 rounded-2xl flex items-center justify-center
                           text-3xl mb-4 shadow-md"
                style={{ background: `${m.accent}33`, border: `2px solid ${m.accent}55` }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              >
                {m.icon}
              </motion.div>

              <h3 className="font-display text-white text-xl mb-2 leading-tight">{m.title}</h3>
              <p className="font-body text-white/72 text-sm leading-relaxed">{m.desc}</p>

              {/* Bottom accent bar */}
              <motion.div
                className="mt-4 h-0.5 rounded-full opacity-50"
                style={{ background: m.accent }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
