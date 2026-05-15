import { Fredoka, Nunito } from 'next/font/google'
import '@/styles/globals.css'

const fredoka = Fredoka({ weight:'400', subsets:['latin'], variable:'--font-fredoka', display:'swap' })
const nunito  = Nunito({ subsets:['latin'], variable:'--font-nunito', display:'swap', weight:['400','500','600','700','800'] })

export const metadata = {
  title: { default:'Mundo Fantástico — Jardín Infantil', template:'%s | Mundo Fantástico' },
  description: 'Un lugar seguro para crecer y aprender. Educación inicial con amor, juego y creatividad en Bogotá.',
  keywords: ['jardín infantil','preescolar','Bogotá','educación inicial','Mundo Fantástico'],
  openGraph: { title:'Mundo Fantástico — Jardín Infantil', description:'Educación inicial con amor, juego y creatividad.', type:'website' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${fredoka.variable} ${nunito.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
