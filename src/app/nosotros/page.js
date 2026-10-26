import Navbar   from '@/components/layout/Navbar'
import Footer   from '@/components/layout/Footer'
import Contacto from '@/components/sections/Contacto'
import {
  NosotrosHero,
  Objetivos,
  Vision,
  Mision,
} from '@/components/sections/nosotros/NosotrosSections'
import { getNosotrosImages } from '@/lib/images'

export const metadata = {
  title: 'Nosotros',
  description:
    'Conoce nuestra misión, visión y objetivos. Más de 15 años formando niños felices en Bogotá.',
}

export default function NosotrosPage() {
  // Fotos locales en /public/images/nosotros (placeholder si no existen)
  const images = getNosotrosImages()

  return (
    <>
      <Navbar />
      <main className="pt-0">
        {/* 1 ── Hero con parallax */}
        <NosotrosHero heroImage={images.hero[0] ?? null} />

        {/* 2 ── Nuestros Objetivos */}
        <Objetivos objetivoImages={images.objetivos} />

        {/* 3 ── Visión */}
        <Vision visionImages={images.vision} />

        {/* 4 ── Misión */}
        <Mision misionImages={images.mision} />

        {/* 5 ── Formulario de contacto (igual que en Home) */}
        <Contacto />
      </main>
      <Footer />
    </>
  )
}
