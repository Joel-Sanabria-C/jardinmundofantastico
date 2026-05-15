'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'

function Cloud({ className, delay=0 }) {
  return (
    <motion.div className={`absolute ${className}`}
      animate={{ x:[0,20,0], y:[0,-8,0] }}
      transition={{ duration:6+delay, repeat:Infinity, ease:'easeInOut', delay }}>
      <div className="relative bg-white/55 h-7 w-28 rounded-full shadow-sm">
        <div className="absolute -top-4 left-4 w-12 h-12 bg-white/55 rounded-full"/>
        <div className="absolute -top-2.5 left-12 w-9 h-9 bg-white/55 rounded-full"/>
      </div>
    </motion.div>
  )
}

const cv = { hidden:{}, show:{ transition:{ staggerChildren:0.12, delayChildren:0.2 } } }
const iv = { hidden:{ opacity:0, y:30 }, show:{ opacity:1, y:0, transition:{ duration:0.6, ease:'easeOut' } } }

export default function Hero({ heroImage }) {
  return (
    <section id="inicio"
      className="relative min-h-[58px] md:min-h-[640px] overflow-hidden
                 flex items-center pt-20 pb-24">

      {/* Fondo gradiente siempre visible */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 opacity-10 pointer-events-none"
           style={{ backgroundImage:'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize:'32px 32px' }}/>

      {/* Nubes */}
      <Cloud className="top-[10%] left-[4%]"  delay={0}/>
      <Cloud className="top-[18%] left-[38%]" delay={1.5}/>
      <Cloud className="top-[10%]  left-[62%]" delay={0.8}/>
      <Cloud className="top-[17%]  left-[52%]" delay={2.8}/>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Columna izquierda — texto */}
          <motion.div variants={cv} initial="hidden" animate="show">
            <motion.div variants={iv}
              className="inline-flex items-center gap-2 bg-white/90 text-brand-blue
                         text-xs font-black font-body uppercase tracking-wide
                         px-4 py-1.5 rounded-full shadow-md mb-5">
              <motion.span animate={{ rotate:[0,15,-15,0] }}
                transition={{ duration:1.5, repeat:Infinity, delay:2 }}>⭐</motion.span>
              ¡Inscripciones 2027 abiertas!
            </motion.div>

            <motion.h1 variants={iv}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-white
                         leading-[1.1] text-shadow mb-4">
              Un lugar seguro<br/>
              <span className="text-brand-yellow">para crecer</span><br/>
              y aprender
            </motion.h1>

            <motion.p variants={iv}
              className="text-white/90 font-semibold text-base md:text-lg
                         font-body leading-relaxed mb-8">
              Educación inicial con amor, juego y creatividad.<br/>
              Formamos niños felices, seguros y curiosos.
            </motion.p>

            <motion.div variants={iv} className="flex flex-wrap gap-3">
              <Link href="/#contacto">
                <motion.span
                  className="inline-flex items-center gap-2 bg-brand-blue text-white
                             font-bold font-body px-6 py-3 rounded-full shadow-card-lg
                             text-sm cursor-pointer"
                  whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:0.97 }}>
                  Inscribe a tu hijo <ArrowRight size={16}/>
                </motion.span>
              </Link>
              <Link href="/nosotros">
                <motion.span
                  className="inline-flex items-center gap-2 bg-white/20 text-white
                             font-bold font-body px-6 py-3 rounded-full border-2
                             border-white/60 backdrop-blur-sm text-sm cursor-pointer"
                  whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:0.97 }}>
                  Conoce más <ChevronDown size={16}/>
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Columna derecha — foto en recuadro */}
          <motion.div
            initial={{ opacity:0, x:50 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.7, delay:0.3 }}
            className="relative block"
          >
            {/* Recuadro con imagen */}
            <div style={{ position:'relative', width:'100%', height:'360px',
             borderRadius:'24px', overflow:'hidden',
         border:'4px solid rgba(55, 208, 35, 0.5)' }}>
              {heroImage?.publicUrl ? (
                <Image
                  src={heroImage.publicUrl}
                  alt="Niños del Jardín Infantil Mundo Fantástico"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="50vw"
                />
              ) : (
                <div className="w-full h-full bg-white/20 flex flex-col
                                items-center justify-center gap-3">
                  <span className="text-8xl">🎈</span>
                  <p className="text-white/70 font-body text-sm font-semibold">
                    Foto del jardín
                  </p>
                </div>
              )}

              {/* Chip top right */}
              <motion.div
                className="absolute top-4 right-4 bg-white/95 rounded-2xl
                           px-3 py-2 shadow-md text-center z-10"
                animate={{ y:[0,-6,0] }}
                transition={{ duration:3, repeat:Infinity }}>
                <p className="font-display text-brand-blue text-lg leading-none">15+</p>
                <p className="font-body text-xs text-gray-500 font-semibold">años</p>
              </motion.div>

              {/* Chip bottom left */}
              <motion.div
                className="absolute bottom-4 left-4 bg-brand-yellow rounded-2xl
                           px-3 py-2 shadow-md text-center z-10"
                animate={{ y:[0,-6,0] }}
                transition={{ duration:3.5, repeat:Infinity, delay:0.5 }}>
                <p className="font-display text-brand-blue text-lg leading-none">500+</p>
                <p className="font-body text-xs text-brand-blue font-bold">familias</p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Niños */}
      <div className="absolute bottom-14 left-4 flex gap-3 md:gap-5 pointer-events-none z-10">
        {['👧','👦','🧒','👧🏽','👦🏻'].map((k,i) => (
          <motion.span key={i} className="text-4xl md:text-5xl drop-shadow-lg select-none"
            animate={{ y:[0,-12,0] }}
            transition={{ duration:2.5+i*0.4, repeat:Infinity, delay:i*0.3 }}>
            {k}
          </motion.span>
        ))}
      </div>

      {/* Césped */}
      <div className="absolute bottom-0 left-0 right-0 h-16 grass-clip pointer-events-none"
           style={{ background:'linear-gradient(to bottom,#388E3C,#1B5E20)' }}/>
    </section>
  )
}
