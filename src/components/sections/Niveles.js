'use client'
import { motion } from 'framer-motion'

const NIVELES = [
  { icon: '🐣', name: 'Párvulos',   year: '1° Primer año',  color: '#FFD600' },
  { icon: '🎨', name: 'Transición', year: '2° Segundo año', color: '#FF8C00' },
  { icon: '🤓', name: 'Transición', year: '3° Tercer año',  color: '#4CAF50' },
  { icon: '📚', name: 'Transición', year: '4° Cuarto año',  color: '#2196F3' },
  { icon: '🔭', name: 'Transición', year: '5° Quinto año',  color: '#9C27B0' },
]

export default function Niveles() {
  return (
    <section id="servicios" className="bg-white py-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {NIVELES.map((nivel, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-gray-100
                         cursor-default group transition-all duration-300
                         hover:border-opacity-100 hover:shadow-card"
              style={{ '--hover-color': nivel.color }}
            >
              {/* Icon circle */}
              <motion.div
                className="w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-sm
                           group-hover:shadow-md transition-shadow duration-300"
                style={{ background: `${nivel.color}22`, border: `2px solid ${nivel.color}55` }}
                whileHover={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.5 }}
              >
                {nivel.icon}
              </motion.div>

              <div className="text-center">
                <p className="font-display text-brand-blue text-base leading-tight">{nivel.name}</p>
                <p className="font-body text-gray-500 text-xs font-semibold mt-0.5">{nivel.year}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
