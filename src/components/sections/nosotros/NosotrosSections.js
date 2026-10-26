'use client'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Target, Eye, Heart, CheckCircle, Sparkles, Users } from 'lucide-react'

/* ─── animation helpers ─── */
const fadeUp  = (delay = 0) => ({
  initial:   { opacity: 0, y: 32 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:  { once: true, margin: '-60px' },
  transition:{ duration: 0.65, ease: 'easeOut', delay },
})
const fadeLeft  = (delay = 0) => ({
  initial:   { opacity: 0, x: -42 },
  whileInView:{ opacity: 1, x: 0   },
  viewport:  { once: true, margin: '-60px' },
  transition:{ duration: 0.7, ease: 'easeOut', delay },
})
const fadeRight = (delay = 0) => ({
  initial:   { opacity: 0, x: 42 },
  whileInView:{ opacity: 1, x: 0  },
  viewport:  { once: true, margin: '-60px' },
  transition:{ duration: 0.7, ease: 'easeOut', delay },
})

/* ── placeholder image block ── */
function ImgPlaceholder({ emoji, label, bucket, height = 'h-80', gradient = 'from-blue-100 to-blue-200' }) {
  return (
    <div className={`w-full ${height} bg-gradient-to-br ${gradient}
                    flex flex-col items-center justify-center gap-3 select-none`}>
      <span className="text-7xl drop-shadow-md">{emoji}</span>
      <p className="font-body text-sm font-semibold text-white/70">{label}</p>
      <p className="font-body text-xs text-white/40">{bucket}</p>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   1. HERO — "NOSOTROS" con parallax
   ══════════════════════════════════════════════════════════ */
export function NosotrosHero({ heroImage }) {
  const ref  = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section ref={ref} className="relative min-h-[380px] md:min-h-[460px] overflow-hidden flex items-end pt-16">

      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        {heroImage?.publicUrl ? (
          <Image
            src="/images/nosotros/hero.svg"
            alt="Nosotros — Mundo Fantástico"
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-nosotros-hero">
            {/* decorative dots */}
            <div className="absolute inset-0 opacity-10"
                 style={{ backgroundImage:'radial-gradient(circle,white 1px,transparent 1px)', backgroundSize:'28px 28px' }}/>
            <div className="absolute inset-0 flex items-center justify-center opacity-20 select-none">
              <span className="text-[14rem]">🎓</span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Gradient overlay — bottom heavy */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          {/* Breadcrumb */}
          <motion.p
            className="font-body text-white/60 text-sm font-semibold mb-3 tracking-widest uppercase"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          >
            Jardín Infantil Mundo Fantástico
          </motion.p>

          {/* Big title */}
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-white
                         text-shadow tracking-widest leading-none mb-4">
            NOSOTROS
          </h1>

          {/* Yellow accent line */}
          <motion.div
            className="mx-auto h-1.5 bg-brand-yellow rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </motion.div>
      </div>

      {/* Wave transition */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="w-full h-14">
          <path d="M0,56 C480,0 960,0 1440,56 L1440,56 L0,56 Z" fill="#D32F2F"/>
        </svg>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   2. OBJETIVOS
   ══════════════════════════════════════════════════════════ */
const OBJETIVOS = [
  {
    icon: <Heart size={20} className="text-blue-500" />,
    color: 'border-l-blue-400',
    text: 'Diseñar un espacio lleno de amor, seguro, respetuoso, estimulando sus habilidades, destrezas y aptitudes para el adecuado desarrollo integral de los niños y niñas de 2 a 5 años de edad, formando en valores y buenos principios por medio del juego para un adecuado desarrollo.',
  },
  {
    icon: <Target size={20} className="text-yellow-500" />,
    color: 'border-l-yellow-400',
    text: 'Desarrollar un modelo pedagógico enfocado en el desarrollo integral del niño.',
  },
  {
    icon: <Sparkles size={20} className="text-green-500" />,
    color: 'border-l-green-400',
    text: 'Educar a los niños para que impacten la sociedad.',
  },
]

export function Objetivos({ objetivoImages }) {
  const mainImg = objetivoImages?.[0] || null

  return (
    <section className="bg-brand-red pt-0 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section heading */}
        <motion.div {...fadeUp(0)} className="mb-10">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white text-shadow">
            NUESTROS OBJETIVOS
          </h2>
          <div className="mt-3 h-1 w-20 bg-brand-yellow rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 items-start">

          {/* Objective cards */}
          <div className="space-y-4">
            {OBJETIVOS.map((obj, i) => (
              <motion.div
                key={i}
                {...fadeLeft(i * 0.12)}
                whileHover={{ x: 6, boxShadow: '0 12px 40px rgba(0,0,0,.18)' }}
                className={`bg-white rounded-2xl p-5 shadow-card flex gap-4 items-start
                            border-l-4 ${obj.color} cursor-default`}
              >
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100
                                flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  {obj.icon}
                </div>
                <p className="font-body text-gray-700 text-sm leading-relaxed">{obj.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Photo */}
          <motion.div
            {...fadeRight(0.1)}
            className="relative rounded-3xl overflow-hidden shadow-card-lg
                       border-4 border-white/25 order-first lg:order-last"
          >
            {mainImg?.publicUrl ? (
              <Image
                src="/images/nosotros/objetivos.svg"
                alt="Nuestros objetivos"
                width={700} height={480}
                className="w-full h-72 md:h-[400px] object-cover"
              />
            ) : (
              <ImgPlaceholder
                emoji="🎓" label="Foto — Objetivos" bucket="public/images/nosotros/objetivos.jpg"
                height="h-72 md:h-[400px]"
                gradient="from-brand-blue-mid to-blue-900"
              />
            )}

            {/* Floating badge */}
            <motion.div
              className="absolute top-4 left-4 bg-brand-yellow rounded-2xl px-4 py-2
                         shadow-glow-y text-center"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <p className="font-display text-brand-blue text-2xl leading-none">+15</p>
              <p className="font-body text-brand-blue text-xs font-bold">años de amor</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   3. VISIÓN
   ══════════════════════════════════════════════════════════ */
export function Vision({ visionImages }) {
  const mainImg = visionImages?.[0] || null

  return (
    <section className="bg-brand-blue py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          {...fadeUp()}
          className="relative rounded-3xl overflow-hidden shadow-card-lg min-h-[360px] md:min-h-[460px]"
        >
          {/* Background image or gradient */}
          {mainImg?.publicUrl ? (
            <>
              <Image
                src={mainImg.publicUrl}
                alt="Visión del jardín"
                fill
                className="object-cover object-center"
                sizes="(max-width:768px) 100vw, 1280px"
              />
              <div className="absolute inset-0 bg-brand-blue/65 backdrop-blur-[1px]" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-mid to-blue-950" />
              <div className="absolute inset-0 opacity-10"
                   style={{ backgroundImage:'radial-gradient(circle,white 1px,transparent 1px)', backgroundSize:'24px 24px' }} />
              <div className="absolute inset-0 flex items-center justify-center opacity-10 select-none">
                <span className="text-[16rem]">👁️</span>
              </div>
            </>
          )}

          {/* Text overlay */}
          <div className="relative z-10 flex flex-col items-center justify-center
                          text-center px-8 md:px-20 py-16 min-h-[360px] md:min-h-[460px]">

            {/* Icon + Title */}
            <motion.div
              className="flex items-center gap-3 mb-5"
              {...fadeUp(0.15)}
            >
              <Eye size={32} className="text-brand-yellow" />
              <h2 className="font-display text-5xl md:text-6xl text-white text-shadow tracking-wide">
                VISIÓN
              </h2>
              <Eye size={32} className="text-brand-yellow" />
            </motion.div>

            {/* Decorative line */}
            <motion.div
              className="h-1 bg-brand-yellow rounded-full mb-6"
              initial={{ width: 0 }} whileInView={{ width: 80 }}
              viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }}
            />

            <motion.p
              {...fadeUp(0.25)}
              className="font-body text-white text-sm md:text-base leading-relaxed
                         max-w-3xl font-medium"
            >
              El jardín infantil Mundo Fantástico se proyecta en el 2029 como una
              institución sólida y reconocida en el sector de Suba Bilbao por la
              innovación, la calidad y el impacto en la formación de principios y
              valores, promoviendo el desarrollo integral de niños y niñas de 2 a 5
              años y propiciando espacios adecuados donde socializan, comparten,
              cultivan, transmiten ideas y conocimientos a través de las inteligencias
              múltiples permitiendo mejorar su proceso de mentes creativas y
              reflejando su individualidad.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   4. MISIÓN
   ══════════════════════════════════════════════════════════ */
export function Mision({ misionImages }) {
  const mainImg = misionImages?.[0] || null

  return (
    <section className="bg-red-gradient py-16 md:py-24 relative overflow-hidden">
      {/* decorative circle */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full
                      bg-white/5 pointer-events-none blur-2xl" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full
                      bg-black/10 pointer-events-none blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Photo — left on desktop */}
          <motion.div
            {...fadeLeft()}
            className="relative rounded-3xl overflow-hidden shadow-card-lg
                       border-4 border-white/20 order-2 lg:order-1"
          >
            {mainImg?.publicUrl ? (
              <Image
                src={mainImg.publicUrl}
                alt="Misión del jardín"
                width={660} height={480}
                className="w-full h-72 md:h-[420px] object-cover"
              />
            ) : (
              <ImgPlaceholder
                emoji="🌱" label="Foto — Misión" bucket="public/images/nosotros/mision.jpg"
                height="h-72 md:h-[420px]"
                gradient="from-red-900 to-red-800"
              />
            )}

            {/* Floating kids */}
            <div className="absolute bottom-4 right-4 flex items-end gap-2 pointer-events-none">
              {['👧','👧🏽'].map((k, i) => (
                <motion.span key={i} className="text-4xl drop-shadow-lg"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}>
                  {k}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Text — right on desktop */}
          <motion.div {...fadeRight(0.1)} className="order-1 lg:order-2">

            {/* Title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center
                              justify-center border border-white/25">
                <Heart size={24} className="text-brand-yellow fill-brand-yellow/30" />
              </div>
              <h2 className="font-display text-5xl md:text-6xl text-white text-shadow tracking-wide">
                MISIÓN
              </h2>
            </div>

            {/* Card */}
            <motion.div
              {...fadeUp(0.2)}
              className="bg-white/12 border border-white/25 rounded-2xl p-6
                         md:p-7 backdrop-blur-sm"
            >
              <p className="font-body text-white text-sm md:text-base leading-relaxed">
                El jardín infantil Mundo Fantástico brinda el servicio de educación
                inicial, nuestro propósito se centra en la formación integral de cada
                niño y niña fundamentados en los valores, las bellas artes, las
                inteligencias múltiples y la inteligencia emocional, para proyectarlos
                como agentes de cambio en la sociedad, a través del desarrollo de
                habilidades y destrezas en ambientes educativos procesos de aprendizajes
                que posibilitan expresiones artísticas con juego lúdico recreativo.
              </p>
            </motion.div>

            {/* Stats strip */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { num: '+15', label: 'Años de trayectoria' },
                { num: '+500', label: 'Familias felices' },
                { num: '5',   label: 'Niveles educativos' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(0.3 + i * 0.1)}
                  className="bg-white/10 border border-white/20 rounded-2xl p-3 text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="font-display text-brand-yellow text-2xl leading-none">{s.num}</p>
                  <p className="font-body text-white/65 text-xs mt-1 font-semibold">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
