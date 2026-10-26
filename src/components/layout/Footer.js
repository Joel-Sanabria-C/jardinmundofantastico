import Link from 'next/link'
import { Instagram, Facebook, MapPin, Phone, Heart } from 'lucide-react'

const NAV_COLS = [
  {
    title: 'Navegación',
    links: [
      { label: 'Inicio',      href: '/'           },
      { label: 'Nosotros',    href: '/nosotros'   },
      { label: 'Servicios',   href: '/servicios'  },
      { label: 'Metodología', href: '/metodologia'},
      { label: 'Contacto',    href: '/#contacto'  },
    ],
  },
  {
    title: 'Contacto',
    links: [
      { label: '📍 Calle 143A 141D 15 Cafam II Superlote 6, Bogotá, Colombia', target:"_blank",href: 'https://www.google.com/maps/place/Ciudadela+Cafam+2+Superlole+6/@4.7507917,-74.117791,17z/data=!3m1!4b1!4m6!3m5!1s0x8e3f847cf63d60db:0x99dd26fb86e8c7eb!8m2!3d4.7507917!4d-74.1152161!16s%2Fg%2F11bw46rp3d?entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D' },
      { label: '📞 320 3017208', target:"_blank",      href: '#' },
      { label: '💬 +57 320 3017208',            target:"_blank",       href: 'https://wa.me/573203017208?text=Hola%2C%20quiero%20información%20sobre%20inscripciones' },
      { label: '✉️ mundofantasticojardininfantil@gmail.com',target:"_blank", href: 'mailto:mundofantasticojardininfantil@gmail.com' },
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
                <img src="/images/logo_jardin.svg" alt="Mundo Fantástico" className="w-11 h-11" />
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
                { href:'https://www.instagram.com/jardinmfantastico/', target:"_blank", label:'Instagram', className:'bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888]', content:<Instagram size={16}/> },
                { href:'https://www.facebook.com/jardinmfantastico/?locale=es_LA',target:"_blank", label:'Facebook',  className:'bg-[#1877F2]', content:<Facebook size={16}/> },
                { href:'https://wa.me/573203017208?text=Hola%2C%20quiero%20información%20sobre%20inscripciones', target:"_blank", label:'WhatsApp',  className:'bg-[#25D366]', content:<span className="text-sm">💬</span> },
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
                          className="font-body text-white/55 text-sm [overflow-wrap:anywhere] hover:text-brand-yellow
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
