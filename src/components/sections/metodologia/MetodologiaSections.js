'use client'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Puzzle, Sparkles, Sun, Heart, BookOpen, Search, FlaskConical, MessageCircle, Palette } from 'lucide-react'

/* ─── animation helpers (mismos que Nosotros) ─── */
const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.65, ease: 'easeOut', delay },
})
const fadeLeft = (delay = 0) => ({
  initial:     { opacity: 0, x: -42 },
  whileInView: { opacity: 1, x: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.7, ease: 'easeOut', delay },
})
const fadeRight = (delay = 0) => ({
  initial:     { opacity: 0, x: 42 },
  whileInView: { opacity: 1, x: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.7, ease: 'easeOut', delay },
})

/* ══════════════════════════════════════════════════════════
   1. HERO — "METODOLOGÍA" con parallax
   ══════════════════════════════════════════════════════════ */
export function MetodologiaHero({ heroImage }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section ref={ref} className="relative min-h-[380px] md:min-h-[460px] overflow-hidden flex items-end pt-16">
      <motion.div className="absolute inset-0" style={{ y }}>
        {heroImage?.publicUrl ? (
          <Image src={heroImage.publicUrl} alt="Metodología — Mundo Fantástico" fill
                 className="object-cover object-center" priority sizes="100vw" />
        ) : (
          <div className="absolute inset-0 bg-hero-gradient">
            <div className="absolute inset-0 opacity-10"
                 style={{ backgroundImage: 'radial-gradient(circle,white 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
            <div className="absolute inset-0 flex items-center justify-center opacity-20 select-none">
              <span className="text-[12rem] md:text-[14rem]">🧩</span>
            </div>
          </div>
        )}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />

      {/* Bloques flotantes decorativos */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        {[
          { e: '🎨', c: 'top-[22%] left-[8%]' },
          { e: '📚', c: 'top-[30%] right-[10%]' },
          { e: '🎵', c: 'top-[55%] left-[18%]' },
          { e: '🔤', c: 'top-[50%] right-[22%]' },
        ].map((b, i) => (
          <motion.span key={i} className={`absolute text-4xl md:text-5xl drop-shadow-lg ${b.c}`}
            animate={{ y: [0, -12, 0], rotate: [0, 6, -6, 0] }}
            transition={{ duration: 4 + i * 0.6, repeat: Infinity, delay: i * 0.4 }}>
            {b.e}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }} className="text-center">
          <motion.p className="font-body text-white/70 text-sm font-semibold mb-3 tracking-widest uppercase"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            Aprendemos jugando
          </motion.p>
          <h1 className="font-display text-[clamp(2.1rem,11vw,6rem)] text-white break-words
                         text-shadow tracking-wide leading-none mb-4">
            METODOLOGÍA
          </h1>
          <motion.div className="mx-auto h-1.5 bg-brand-yellow rounded-full"
                      initial={{ width: 0 }} animate={{ width: 120 }}
                      transition={{ duration: 0.8, delay: 0.6 }} />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="w-full h-14">
          <path d="M0,56 C480,0 960,0 1440,56 L1440,56 L0,56 Z" fill="#1A237E" />
        </svg>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   2. ENFOQUE — cómo enseñamos
   ══════════════════════════════════════════════════════════ */
const PRINCIPIOS = [
  { icon: <Puzzle size={20} />,   color: '#FFD600', title: 'El juego como motor',    desc: 'Cada actividad nace del juego lúdico y recreativo.' },
  { icon: <Heart size={20} />,    color: '#FF5252', title: 'Amor y valores',          desc: 'Formamos en principios, respeto y amor a Dios.' },
  { icon: <Sparkles size={20} />, color: '#4CAF50', title: 'Inteligencias múltiples', desc: 'Reconocemos y potenciamos la individualidad de cada niño.' },
]

export function Enfoque({ aulaImage }) {
  return (
    <section className="bg-brand-blue pt-6 pb-16 md:pb-24 relative overflow-hidden">
      <div className="absolute top-10 right-0 w-64 h-64 rounded-full bg-white/5 translate-x-1/3 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          <motion.div {...fadeLeft()}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white text-shadow">
              NUESTRO ENFOQUE
            </h2>
            <div className="mt-3 mb-6 h-1 w-20 bg-brand-yellow rounded-full" />
            <p className="font-body text-white/85 text-base md:text-lg leading-relaxed mb-8">
              Creemos que los primeros años son los más importantes del desarrollo humano.
              Por eso aplicamos una pedagogía activa centrada en el niño, donde el juego,
              la exploración, las bellas artes y las emociones son el camino hacia cada aprendizaje.
            </p>

            <div className="space-y-3">
              {PRINCIPIOS.map((p, i) => (
                <motion.div key={p.title} className="valor-card" {...fadeLeft(0.1 + i * 0.12)}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                       style={{ background: `${p.color}33`, color: p.color }}>
                    {p.icon}
                  </div>
                  <div>
                    <p className="font-display text-white text-lg leading-none mb-1">{p.title}</p>
                    <p className="font-body text-white/65 text-sm">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeRight(0.1)}
            className="relative rounded-3xl overflow-hidden shadow-card-lg border-4 border-white/20">
            {aulaImage?.publicUrl ? (
              <Image src={aulaImage.publicUrl} alt="Niños aprendiendo en el aula" width={700} height={480}
                     className="w-full h-72 md:h-[420px] object-cover" />
            ) : (
              <div className="w-full h-72 md:h-[420px] bg-gradient-to-br from-brand-blue-lt to-blue-950
                              flex flex-col items-center justify-center gap-3 select-none">
                <span className="text-7xl drop-shadow-md">🧸</span>
                <p className="font-body text-sm font-semibold text-white/70">Foto — Aula</p>
                <p className="font-body text-xs text-white/40">public/images/metodologia/aula.jpg</p>
              </div>
            )}
            <motion.div className="absolute bottom-4 left-4 bg-brand-yellow rounded-2xl px-4 py-2 shadow-glow-y"
                        animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <p className="font-display text-brand-blue text-xl leading-none">2 a 5 años</p>
              <p className="font-body text-brand-blue text-xs font-bold">educación inicial</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   3. PILARES — áreas de trabajo
   ══════════════════════════════════════════════════════════ */
const PILARES = [
  { icon: '🎮', title: '¡Hello Friends!',       accent: '#FFD600', desc: 'Enseñamos bases de inglés para que los niños reconozcan y disfruten la segunda lengua desde temprana edad.' },
  { icon: '🧮', title: '¿Cuánto es 20 − 12?',   accent: '#FF8C00', desc: 'Sentamos las bases de la lógica matemática que aplicamos en la vida diaria: contar, comparar y resolver.' },
  { icon: '📖', title: '"Había una vez..."',     accent: '#4CAF50', desc: 'Practicamos la comprensión lectora para que conozcan solos las aventuras de los libros y amen la lectura.' },
  { icon: '😊', title: 'Por favor y gracias',    accent: '#2196F3', desc: 'Un ambiente seguro que fortalece la autoestima, los valores y el respeto y amor por el otro.' },
  { icon: '🎨', title: 'Bellas artes',           accent: '#E040FB', desc: 'Música, pintura, manualidades y teatro para que cada niño exprese su mundo interior.' },
  { icon: '💛', title: 'Inteligencia emocional', accent: '#FF5252', desc: 'Aprenden a reconocer lo que sienten, a compartir y a convivir con los demás.' },
]

export function Pilares() {
  return (
    <section className="bg-red-gradient py-16 md:py-24 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div {...fadeUp()} className="mb-10 md:mb-14 text-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white text-shadow">
            NUESTROS PILARES
          </h2>
          <div className="mx-auto mt-3 mb-4 h-1 w-20 bg-brand-yellow rounded-full" />
          <p className="font-body text-white/75 font-semibold text-base md:text-lg">
            Enseñamos con aprendizaje, juego y mucho amor a Dios.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PILARES.map((p, i) => (
            <motion.div key={p.title} {...fadeUp(i * 0.08)} whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-6 shadow-card flex flex-col cursor-default border-t-4"
              style={{ borderTopColor: p.accent }}>
              <motion.div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4"
                          style={{ background: `${p.accent}22`, border: `2px solid ${p.accent}55` }}
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}>
                {p.icon}
              </motion.div>
              <h3 className="font-display text-brand-blue text-xl mb-2">{p.title}</h3>
              <p className="font-body text-gray-600 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   4. CICLO DE APRENDIZAJE
   ══════════════════════════════════════════════════════════ */
const CICLO = [
  { icon: <Search size={26} />,        color: '#FFD600', title: 'Explorar',     desc: 'Descubren el mundo con sus sentidos y su curiosidad.' },
  { icon: <FlaskConical size={26} />,  color: '#FF8C00', title: 'Experimentar', desc: 'Prueban ideas y soluciones de forma creativa.' },
  { icon: <MessageCircle size={26} />, color: '#4CAF50', title: 'Reflexionar',  desc: 'Conversamos sobre lo aprendido y lo conectamos con su vida.' },
  { icon: <Palette size={26} />,       color: '#2196F3', title: 'Crear',        desc: 'Producen algo propio: un dibujo, una historia, un proyecto.' },
]

export function CicloAprendizaje() {
  return (
    <section className="bg-brand-cream py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp()} className="mb-12 md:mb-16 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-brand-blue">¿Cómo aprendemos?</h2>
          <div className="mx-auto mt-3 mb-4 h-1 w-20 bg-brand-yellow rounded-full" />
          <p className="font-body text-gray-500 font-semibold">Cada experiencia sigue cuatro pasos</p>
        </motion.div>

        <div className="relative">
          {/* Línea conectora (desktop) */}
          <motion.div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-1 rounded-full
                       bg-gradient-to-r from-brand-yellow via-brand-orange to-blue-500 origin-left"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {CICLO.map((c, i) => (
              <motion.div key={c.title} {...fadeUp(0.15 + i * 0.15)}
                          className="relative flex flex-col items-center text-center">
                <motion.div className="relative w-20 h-20 rounded-full bg-white shadow-card flex items-center
                                       justify-center mb-5 border-4"
                            style={{ borderColor: c.color, color: c.color }}
                            whileHover={{ scale: 1.1, rotate: 8 }}>
                  {c.icon}
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-brand-blue text-white
                                   font-display text-sm flex items-center justify-center shadow-md">
                    {i + 1}
                  </span>
                </motion.div>
                <h3 className="font-display text-brand-blue text-2xl mb-2">{c.title}</h3>
                <p className="font-body text-gray-600 text-sm leading-relaxed max-w-[240px]">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   5. UN DÍA EN MUNDO FANTÁSTICO
   ══════════════════════════════════════════════════════════ */
const DIA = [
  { emoji: '🌅', title: 'Bienvenida',            desc: 'Recibimos a cada niño con un saludo y la oración de la mañana.' },
  { emoji: '🍎', title: 'Desayuno y hábitos',     desc: 'Compartimos la mesa y practicamos hábitos de higiene.' },
  { emoji: '📚', title: 'Actividad pedagógica',   desc: 'Inglés, lógica, lectura y proyectos según su nivel.' },
  { emoji: '🎈', title: 'Recreo y juego libre',   desc: 'Tiempo para moverse, imaginar y hacer amigos.' },
  { emoji: '🎨', title: 'Arte y música',          desc: 'Pintura, canto, baile y expresión corporal.' },
  { emoji: '🏠', title: 'Cierre del día',         desc: 'Recordamos lo aprendido y regresan felices a casa.' },
]

export function DiaEnElJardin() {
  return (
    <section className="bg-blue-gradient py-16 md:py-24 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white/5 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div {...fadeUp()} className="mb-10 md:mb-14 text-center">
          <div className="flex items-center justify-center gap-3">
            <Sun size={30} className="text-brand-yellow hidden sm:block" />
            <h2 className="font-display text-4xl md:text-5xl text-white text-shadow">
              Un día en Mundo Fantástico
            </h2>
          </div>
          <div className="mx-auto mt-3 mb-4 h-1 w-20 bg-brand-yellow rounded-full" />
          <p className="font-body text-white/70 font-semibold">Una rutina que da seguridad, alegría y aprendizaje</p>
        </motion.div>

        <div className="relative">
          {/* Línea vertical */}
          <div className="absolute left-6 md:left-1/2 top-2 bottom-2 w-0.5 bg-white/20 md:-translate-x-1/2" />

          <div className="space-y-6 md:space-y-8">
            {DIA.map((d, i) => {
              const izquierda = i % 2 === 0
              return (
                <motion.div key={d.title} {...(izquierda ? fadeLeft(i * 0.05) : fadeRight(i * 0.05))}
                  className={`relative flex items-center gap-4 md:gap-0 ${izquierda ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Punto */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-brand-yellow shadow-glow-y flex-shrink-0
                                  flex items-center justify-center text-2xl md:absolute md:left-1/2 md:-translate-x-1/2">
                    {d.emoji}
                  </div>
                  {/* Tarjeta */}
                  <div className={`flex-1 md:w-[calc(50%-48px)] md:flex-none ${izquierda ? 'md:mr-auto md:text-right' : 'md:ml-auto'}`}>
                    <div className="valor-card !block hover:!translate-x-0">
                      <p className="font-display text-white text-lg leading-tight mb-1">{d.title}</p>
                      <p className="font-body text-white/65 text-sm">{d.desc}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.p {...fadeUp(0.2)} className="mt-10 text-center font-body text-white/50 text-xs flex items-center justify-center gap-2">
          <BookOpen size={14} /> Los horarios exactos se comparten con cada familia al momento de la inscripción.
        </motion.p>
      </div>
    </section>
  )
}
