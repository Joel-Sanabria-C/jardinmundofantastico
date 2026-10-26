'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Instagram, Facebook } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Inicio',       href: '/'            },
  { label: 'Nosotros',     href: '/nosotros'    },
  { label: 'Servicios',    href: '/servicios'   },
  { label: 'Metodología',  href: '/metodologia' },
]

export default function Navbar() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  const isActive = (href) => {
    if (href.includes('#')) return false
    return pathname === href
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/96 backdrop-blur-lg shadow-lg shadow-black/8'
          : 'bg-white shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* ── Brand ── */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <motion.div
              className="w-11 h-11 rounded-full bg-brand-yellow flex items-center
                         justify-center text-2xl shadow-md group-hover:shadow-glow-y
                         transition-shadow duration-300"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{  scale: 0.95 }}
            >
              <img src="/images/logo_jardin.svg" alt="Mundo Fantástico" className="w-11 h-11" />
            </motion.div>
            <span className="font-display text-lg md:text-xl text-brand-blue leading-none">
              Mundo Fantástico
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.3 }}
              >
                <Link
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold font-body
                              transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-brand-blue bg-brand-blue/10 font-bold'
                      : 'text-gray-600 hover:text-brand-blue hover:bg-brand-blue/6'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      className="h-0.5 bg-brand-red rounded-full mt-0.5"
                      layoutId="nav-underline"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* ── Social icons – desktop ── */}
          <div className="hidden lg:flex items-center gap-2">
            {[
              {
                Icon: Instagram,
                label: 'Instagram',
                href: 'https://www.instagram.com/jardinmfantastico/',
                target:"_blank",
                className: 'bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888]',
              },
              { Icon: Facebook, label: 'Facebook',target:"_blank", href: 'https://www.facebook.com/jardinmfantastico/?locale=es_LA', className: 'bg-[#1877F2]' },
              { emoji: '💬',   label: 'WhatsApp',target:"_blank", href: 'https://wa.me/573203017208?text=Hola%2C%20quiero%20información%20sobre%20inscripciones', className: 'bg-[#25D366]' },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className={`w-9 h-9 rounded-full ${s.className} flex items-center
                            justify-center text-white text-sm shadow-sm`}
                whileHover={{ scale: 1.18, rotate: 6 }}
                whileTap={{  scale: 0.93 }}
              >
                {s.Icon ? <s.Icon size={16} /> : <span className="text-base">{s.emoji}</span>}
              </motion.a>
            ))}
          </div>

          {/* ── Mobile toggle ── */}
          <motion.button
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100
                       transition-colors"
            onClick={() => setOpen(!open)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{   opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 bg-white space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm
                                font-semibold font-body transition-all duration-200 ${
                      isActive(link.href)
                        ? 'text-brand-blue bg-brand-blue/10 font-bold border-l-4 border-brand-red'
                        : 'text-gray-700 hover:text-brand-blue hover:bg-brand-blue/6'
                    }`}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <span className="ml-auto text-xs text-brand-red font-bold">●</span>
                    )}
                  </Link>
                </motion.div>
              ))}

              {/* Social – mobile */}
              <div className="flex gap-3 pt-3 pl-4 border-t border-gray-100 mt-2">
                <a target="_blank" href="https://www.instagram.com/jardinmfantastico/" aria-label="Instagram"
                   className="w-9 h-9 rounded-full bg-gradient-to-br from-[#f09433]
                              via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white">
                  <Instagram size={16} />
                </a>
                <a target="_blank" href="https://www.facebook.com/jardinmfantastico/?locale=es_LA" aria-label="Facebook"
                   className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center
                              justify-center text-white">
                  <Facebook size={16} />
                </a>
                <a target="_blank" href="https://wa.me/573203017208?text=Hola%2C%20quiero%20información%20sobre%20inscripciones" aria-label="WhatsApp"
                   className="w-9 h-9 rounded-full bg-[#25D366] flex items-center
                              justify-center text-white text-base">
                  💬
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
