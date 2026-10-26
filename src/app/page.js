import Navbar   from '@/components/layout/Navbar'
import Footer   from '@/components/layout/Footer'
import Hero     from '@/components/sections/Hero'
import Contacto from '@/components/sections/Contacto'
import { Niveles, QuienesSomos, Metodologia } from '@/components/sections/HomeSections'

export const metadata = {
  title: 'Mundo Fantástico — Jardín Infantil',
  description: 'Un lugar seguro para crecer y aprender. Educación inicial en Bogotá.',
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Niveles />
        <QuienesSomos />
        <Metodologia />
        <Contacto />
      </main>
      <Footer />
    </>
  )
}
