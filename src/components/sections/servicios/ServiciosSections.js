'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  BookOpen, Languages, Palette, HeartHandshake, Users, PartyPopper,
  ShieldCheck, MessagesSquare, Award, ClipboardList, Phone, School, Smile, ArrowRight,
} from 'lucide-react'

/* ─── animation helpers (mismos que Nosotros y Metodología) ─── */
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
   1. HERO — "SERVICIOS" con parallax
   ══════════════════════════════════════════════════════════ */
export function ServiciosHero({ heroImage }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section ref={ref} className="relative min-h-[380px] md:min-h-[460px] overflow-hidden flex items-end pt-16">
      <motion.div className="absolute inset-0" style={{ y }}>
        {heroImage?.publicUrl ? (
          <Image src={heroImage.publicUrl} alt="Servicios — Mundo Fantástico" fill
                 className="object-cover object-center" priority sizes="100vw" />
        ) : (
          <div className="absolute inset-0 bg-blue-gradient">
            <div className="absolute inset-0 opacity-10"
                 style={{ backgroundImage: 'radial-gradient(circle,white 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
            <div className="absolute inset-0 flex items-center justify-center opacity-20 select-none">
              <span className="text-[12rem] md:text-[14rem]">🎒</span>
            </div>
          </div>
        )}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />

      {/* Elementos flotantes decorativos */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        {[
          { e: '✏️', c: 'top-[24%] left-[9%]' },
          { e: '🧸', c: 'top-[30%] right-[11%]' },
          { e: '🖍️', c: 'top-[56%] left-[19%]' },
          { e: '🎓', c: 'top-[52%] right-[21%]' },
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
            Educación inicial de 2 a 5 años
          </motion.p>
          <h1 className="font-display text-[clamp(2.1rem,11vw,6rem)] text-white break-words
                         text-shadow tracking-wide leading-none mb-4">
            SERVICIOS
          </h1>
          <motion.div className="mx-auto h-1.5 bg-brand-yellow rounded-full"
                      initial={{ width: 0 }} animate={{ width: 120 }}
                      transition={{ duration: 0.8, delay: 0.6 }} />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="w-full h-14">
          <path d="M0,56 C480,0 960,0 1440,56 L1440,56 L0,56 Z" fill="#FFF8ED" />
        </svg>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   2. NIVELES EDUCATIVOS
   ══════════════════════════════════════════════════════════ */
const NIVELES = [
  { icon: '🐣', name: 'Párvulos',   year: '1° Primer año',  color: '#FFD600', text: '#A67C00',
    desc: 'Primeros pasos en el jardín: adaptación, lenguaje, motricidad y hábitos de autocuidado.' },
  { icon: '🎨', name: 'Transición', year: '2° Segundo año', color: '#FF8C00',
    desc: 'Exploración y expresión a través del juego, el arte, la música y el movimiento.' },
  { icon: '🤓', name: 'Transición', year: '3° Tercer año',  color: '#4CAF50',
    desc: 'Pensamiento lógico, conteo, colores y formas, y primeros acercamientos a las letras.' },
  { icon: '📚', name: 'Transición', year: '4° Cuarto año',  color: '#2196F3',
    desc: 'Lectura inicial, vocabulario en inglés y trabajo en equipo en proyectos de aula.' },
  { icon: '🔭', name: 'Transición', year: '5° Quinto año',  color: '#9C27B0',
    desc: 'Preparación para el colegio: lectoescritura, lógica matemática y autonomía.' },
]

export function NivelesEducativos() {
  return (
    <section className="bg-brand-cream pt-6 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp()} className="mb-10 md:mb-14 text-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-brand-blue">
            NIVELES EDUCATIVOS
          </h2>
          <div className="mx-auto mt-3 mb-4 h-1 w-20 bg-brand-yellow rounded-full" />
          <p className="font-body text-gray-500 font-semibold text-base md:text-lg max-w-2xl mx-auto">
            Acompañamos a cada niño en su etapa, con actividades pensadas para su edad y su ritmo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {NIVELES.map((n, i) => (
            <motion.div key={n.year} {...fadeUp(i * 0.08)} whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-6 shadow-card flex flex-col items-center text-center
                         cursor-default border-b-4"
              style={{ borderBottomColor: n.color }}>
              <motion.div className="w-16 h-16 rounded-full flex items-center justify-center text-4xl mb-4"
                          style={{ background: `${n.color}22`, border: `2px solid ${n.color}55` }}
                          whileHover={{ rotate: [-8, 8, 0] }}>
                {n.icon}
              </motion.div>
              <h3 className="font-display text-brand-blue text-2xl leading-none">{n.name}</h3>
              <p className="font-body text-xs font-bold uppercase tracking-wide mt-1.5 mb-3"
                 style={{ color: n.text ?? n.color }}>
                {n.year}
              </p>
              <p className="font-body text-gray-600 text-sm leading-relaxed">{n.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   3. QUÉ INCLUYE
   ══════════════════════════════════════════════════════════ */
const INCLUYE = [
  { icon: <BookOpen size={24} />,       accent: '#FFD600', title: 'Programa pedagógico',
    desc: 'Lógica matemática, comprensión lectora y desarrollo del lenguaje a través del juego.' },
  { icon: <Languages size={24} />,      accent: '#FF8C00', title: 'Inglés desde pequeños',
    desc: '¡Hello Friends! Canciones, juegos y vocabulario para disfrutar la segunda lengua.' },
  { icon: <Palette size={24} />,        accent: '#E040FB', title: 'Bellas artes',
    desc: 'Pintura, música, manualidades y teatro para expresar su mundo interior.' },
  { icon: <HeartHandshake size={24} />, accent: '#FF5252', title: 'Formación en valores',
    desc: 'Respeto, amor a Dios y al otro, y la inteligencia emocional como base de la convivencia.' },
  { icon: <Users size={24} />,          accent: '#2196F3', title: 'Acompañamiento a familias',
    desc: 'Comunicación cercana con los padres sobre el proceso y los avances de cada niño.' },
  { icon: <PartyPopper size={24} />,    accent: '#4CAF50', title: 'Celebraciones y eventos',
    desc: 'Grados, cumpleaños y fechas especiales que se convierten en recuerdos para toda la vida.' },
]

export function QueIncluye() {
  return (
    <section className="bg-red-gradient py-16 md:py-24 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div {...fadeUp()} className="mb-10 md:mb-14">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white text-shadow">
            ¿QUÉ INCLUYE?
          </h2>
          <div className="mt-3 mb-4 h-1 w-20 bg-brand-yellow rounded-full" />
          <p className="font-body text-white/75 font-semibold text-base md:text-lg">
            Todo lo que tu hijo vive en Mundo Fantástico.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INCLUYE.map((s, i) => (
            <motion.div key={s.title} {...fadeUp(i * 0.08)} whileHover={{ y: -8 }}
              className="bg-white/12 border border-white/20 rounded-2xl p-6 backdrop-blur-sm
                         hover:bg-white/20 transition-colors duration-300 cursor-default">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                   style={{ background: `${s.accent}33`, border: `2px solid ${s.accent}66`, color: s.accent }}>
                {s.icon}
              </div>
              <h3 className="font-display text-white text-xl mb-2">{s.title}</h3>
              <p className="font-body text-white/75 text-sm leading-relaxed">{s.desc}</p>
              <motion.div className="mt-4 h-0.5 rounded-full opacity-60 origin-left" style={{ background: s.accent }}
                          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.08 }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   4. ENTORNO SEGURO
   ══════════════════════════════════════════════════════════ */
const GARANTIAS = [
  { icon: <ShieldCheck size={20} />,    color: '#4CAF50', title: 'Ambiente seguro',        desc: 'Espacios cuidados y niños siempre acompañados por adultos.' },
  { icon: <Users size={20} />,          color: '#FFD600', title: 'Grupos por nivel',        desc: 'Cada niño aprende junto a compañeros de su misma etapa.' },
  { icon: <MessagesSquare size={20} />, color: '#2196F3', title: 'Comunicación constante', desc: 'Las familias saben cómo está y qué aprende su hijo.' },
  { icon: <Award size={20} />,          color: '#FF8C00', title: '+15 años de experiencia', desc: 'Un equipo que ha acompañado a cientos de familias en Bogotá.' },
]

export function EntornoSeguro({ instalacionesImage }) {
  return (
    <section className="bg-brand-blue py-16 md:py-24 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white/5 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          <motion.div {...fadeLeft()}
            className="relative rounded-3xl overflow-hidden shadow-card-lg border-4 border-white/20 order-2 lg:order-1">
            {instalacionesImage?.publicUrl ? (
              <Image src={instalacionesImage.publicUrl} alt="Instalaciones del jardín" width={700} height={480}
                     className="w-full h-72 md:h-[420px] object-cover" />
            ) : (
              <div className="w-full h-72 md:h-[420px] bg-gradient-to-br from-brand-blue-lt to-blue-950
                              flex flex-col items-center justify-center gap-3 select-none">
                <span className="text-7xl drop-shadow-md">🏫</span>
                <p className="font-body text-sm font-semibold text-white/70">Foto — Instalaciones</p>
                <p className="font-body text-xs text-white/40">public/images/servicios/instalaciones.jpg</p>
              </div>
            )}
            <motion.div className="absolute top-4 right-4 bg-brand-yellow rounded-2xl px-4 py-2 shadow-glow-y text-center"
                        animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <p className="font-display text-brand-blue text-xl leading-none">Suba Bilbao</p>
              <p className="font-body text-brand-blue text-xs font-bold">Bogotá</p>
            </motion.div>
          </motion.div>

          <motion.div {...fadeRight(0.1)} className="order-1 lg:order-2">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white text-shadow">
              UN ENTORNO SEGURO
            </h2>
            <div className="mt-3 mb-6 h-1 w-20 bg-brand-yellow rounded-full" />
            <p className="font-body text-white/85 text-base md:text-lg leading-relaxed mb-8">
              Sabemos que dejar a tu hijo en el jardín es un acto de confianza.
              Por eso cuidamos cada detalle para que se sienta en casa.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GARANTIAS.map((g, i) => (
                <motion.div key={g.title} {...fadeUp(0.1 + i * 0.1)}
                  className="bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                         style={{ background: `${g.color}33`, color: g.color }}>
                      {g.icon}
                    </div>
                    <p className="font-display text-white text-lg leading-tight">{g.title}</p>
                  </div>
                  <p className="font-body text-white/65 text-sm">{g.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   5. PROCESO DE INSCRIPCIÓN
   ══════════════════════════════════════════════════════════ */
const PASOS = [
  { icon: <ClipboardList size={26} />, color: '#FFD600', title: 'Llena el formulario', desc: 'Déjanos los datos de tu hijo y cómo contactarte.' },
  { icon: <Phone size={26} />,         color: '#FF8C00', title: 'Te contactamos',      desc: 'Te llamamos en menos de 24 horas para resolver tus dudas.' },
  { icon: <School size={26} />,        color: '#4CAF50', title: 'Visita el jardín',    desc: 'Conoce los espacios, el equipo y nuestra forma de trabajar.' },
  { icon: <Smile size={26} />,         color: '#2196F3', title: '¡Bienvenido!',        desc: 'Formalizamos la matrícula y comienza la aventura.' },
]

export function ProcesoInscripcion() {
  return (
    <section className="bg-brand-cream py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp()} className="mb-12 md:mb-16 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-brand-blue">¿Cómo inscribir a tu hijo?</h2>
          <div className="mx-auto mt-3 mb-4 h-1 w-20 bg-brand-yellow rounded-full" />
          <p className="font-body text-gray-500 font-semibold">Cuatro pasos sencillos</p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-1 rounded-full
                       bg-gradient-to-r from-brand-yellow via-brand-orange to-blue-500 origin-left"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {PASOS.map((p, i) => (
              <motion.div key={p.title} {...fadeUp(0.15 + i * 0.15)}
                          className="relative flex flex-col items-center text-center">
                <motion.div className="relative w-20 h-20 rounded-full bg-white shadow-card flex items-center
                                       justify-center mb-5 border-4"
                            style={{ borderColor: p.color, color: p.color }}
                            whileHover={{ scale: 1.1, rotate: 8 }}>
                  {p.icon}
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-brand-red text-white
                                   font-display text-sm flex items-center justify-center shadow-md">
                    {i + 1}
                  </span>
                </motion.div>
                <h3 className="font-display text-brand-blue text-2xl mb-2">{p.title}</h3>
                <p className="font-body text-gray-600 text-sm leading-relaxed max-w-[240px]">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div {...fadeUp(0.3)} className="mt-12 text-center">
          <Link href="#contacto">
            <motion.span className="inline-flex items-center gap-2 bg-brand-red text-white font-bold font-body
                                    px-7 py-3.5 rounded-full shadow-glow-r text-sm md:text-base cursor-pointer"
                         whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              Empieza la inscripción <ArrowRight size={18} />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
