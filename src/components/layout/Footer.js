import Link from 'next/link'
import { Instagram, Facebook, MapPin, Phone, Heart } from 'lucide-react'

const NAV_COLS = [
  {
    title: 'Navegación',
    links: [
      { label: 'Inicio',      href: '/'           },
      { label: 'Nosotros',    href: '/nosotros'   },
      { label: 'Servicios',   href: '/#servicios' },
      { label: 'Galería',     href: '/#galeria'   },
      { label: 'Metodología', href: '/#metodologia'},
      { label: 'Contacto',    href: '/#contacto'  },
    ],
  },
  {
    title: 'Contacto',
    links: [
      { label: '📍 Calle 142A #14J0-15, Bogotá', href: '#' },
      { label: '📞 [Teléfono de contacto]',       href: '#' },
      { label: '💬 [WhatsApp]',                   href: '#' },
      { label: '✉️ [correo@jardin.com]',           href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#080c4a]">
      {/* Top accent */}
      <div className="h-1.5 bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-red" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Main grid */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-10">

          {/* Brand block */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-12 h-12 rounded-full bg-brand-yellow flex items-center
                              justify-center text-2xl shadow-md group-hover:shadow-glow-y
                              transition-shadow duration-300">
                🌟
              </div>
              <div>
                <span className="font-display text-xl text-white block leading-tight">
                  Mundo Fantástico
                </span>
                <span className="font-body text-white/45 text-xs">
                  Jardín Infantil · Bogotá
                </span>
              </div>
            </Link>
            <p className="font-body text-white/55 text-sm leading-relaxed mb-5">
              Un lugar seguro para crecer y aprender. Formamos niños felices,
              seguros y curiosos con amor, juego y creatividad.
            </p>
            {/* Socials */}
            <div className="flex gap-2">
              {[
                { href:'#', label:'Instagram', className:'bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888]', content:<Instagram size={16}/> },
                { href:'#', label:'Facebook',  className:'bg-[#1877F2]', content:<Facebook size={16}/> },
                { href:'#', label:'WhatsApp',  className:'bg-[#25D366]', content:<span className="text-sm">💬</span> },
              ].map(s => (
                <a key={s.label} href={s.href} aria-label={s.label}
                   className={`w-9 h-9 rounded-full ${s.className} flex items-center
                               justify-center text-white hover:scale-110 hover:shadow-md
                               transition-all duration-200`}>
                  {s.content}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map(col => (
            <div key={col.title}>
              <h6 className="font-display text-brand-yellow text-lg mb-4">{col.title}</h6>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link href={l.href}
                          className="font-body text-white/55 text-sm hover:text-brand-yellow
                                     transition-colors duration-200 hover:translate-x-1
                                     inline-block transition-transform">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-white/10 flex flex-col sm:flex-row
                        items-center justify-between gap-3">
          <p className="font-body text-white/35 text-xs">
            © {new Date().getFullYear()} Jardín Infantil Mundo Fantástico.
            Todos los derechos reservados.
          </p>
          <p className="font-body text-white/30 text-xs flex items-center gap-1">
            Hecho con <Heart size={12} className="text-brand-red fill-brand-red mx-0.5"/> en Bogotá, Colombia
          </p>
        </div>
      </div>
    </footer>
  )
}
