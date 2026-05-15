'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const CATEGORIAS = ['Todas','Instalaciones','Actividades','Eventos','Arte & Música','Juego libre']

const FALLBACK = [
  { label:'📸 Instalaciones', emoji:'🏫', gradient:'from-sky-300 to-blue-400',    categoria:'Instalaciones', tall:false },
  { label:'🎭 Actividades',   emoji:'🎨', gradient:'from-violet-300 to-purple-400', categoria:'Actividades',  tall:false },
  { label:'🎄 Eventos',       emoji:'🎉', gradient:'from-red-400 to-rose-500',      categoria:'Eventos',      tall:true  },
  { label:'🎵 Arte & Música', emoji:'🎶', gradient:'from-amber-300 to-orange-400',  categoria:'Arte & Música', tall:false },
  { label:'🌿 Juego Libre',   emoji:'⚽', gradient:'from-green-400 to-emerald-500', categoria:'Juego libre',  tall:false },
]

export default function Galeria({ images = [] }) {
  const [catActiva, setCatActiva] = useState('Todas')

  // Usa imágenes de Supabase si existen, si no usa fallback
  const items = images.length > 0 ? images : FALLBACK

  const filtradas = catActiva === 'Todas'
    ? items
    : items.filter(img => img.categoria === catActiva || img.label?.includes(catActiva))

  return (
    <section id="galeria" className="bg-[#FFF8ED] py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div className="text-center mb-10" initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <h2 className="font-display text-4xl md:text-5xl text-brand-blue mb-2">Galería</h2>
          <p className="font-body text-gray-500 font-semibold">Momentos que hacen la diferencia</p>
          <motion.div className="mx-auto mt-4 h-1 w-16 bg-brand-yellow rounded-full" initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }} transition={{ delay:0.3 }}/>
        </motion.div>

        {/* Filtros de categoría */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {CATEGORIAS.map(cat => (
            <motion.button key={cat} onClick={() => setCatActiva(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold font-body transition-all duration-200 ${
                catActiva === cat ? 'bg-brand-blue text-white shadow-card' : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-blue hover:text-brand-blue'
              }`}
              whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}>
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px]">
          {filtradas.map((item, i) => (
            <motion.div key={i}
              className={`relative rounded-2xl overflow-hidden cursor-pointer shadow-card group ${item.tall ? 'md:row-span-2' : ''}`}
              initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay:i*0.07 }}
              whileHover={{ scale:1.03, zIndex:10 }}>

              {/* Imagen real de Supabase */}
              {item.publicUrl ? (
                <Image src={item.publicUrl} alt={item.name || 'Galería'} fill className="object-cover" sizes="(max-width:768px) 50vw, 33vw"/>
              )  : (
                /* Placeholder cuando no hay imagen */
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                  <motion.span className="text-6xl filter drop-shadow-lg" animate={{ y:[0,-8,0] }} transition={{ duration:3+i*0.4, repeat:Infinity }}>
                    {item.emoji}
                  </motion.span>
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>

              {/* Label */}
              <div className="absolute bottom-3 left-3 z-10 bg-black/50 backdrop-blur-sm text-white font-body text-xs font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                {item.label || item.name}
              </div>
            </motion.div>
          ))}
        </div>

        {images.length === 0 && (
          <p className="text-center text-gray-400 text-xs font-body mt-4">
            Las imágenes se cargarán desde Supabase Storage (bucket: <code>imagenes/galeria</code>)
          </p>
        )}
      </div>
    </section>
  )
}
