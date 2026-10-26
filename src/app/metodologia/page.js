import Navbar   from '@/components/layout/Navbar'
import Footer   from '@/components/layout/Footer'
import Contacto from '@/components/sections/Contacto'
import Image from 'next/image'
import {
  MetodologiaHero,
  Enfoque,
  Pilares,
  CicloAprendizaje,
  DiaEnElJardin,
} from '@/components/sections/metodologia/MetodologiaSections'
import { getMetodologiaImages } from '@/lib/images'

export const metadata = {
  title: 'Metodología',
  description:
    'Aprendemos jugando: inglés, lógica matemática, lectura, bellas artes, valores e inteligencia emocional para niños de 2 a 5 años en Suba Bilbao, Bogotá.',
}

export default function MetodologiaPage() {
  // Fotos locales en /public/images/metodologia (placeholder si no existen)
  const images = getMetodologiaImages()

  return (
    <>
      <Navbar />
      <main>
        {/* 1 ── Hero con parallax */}
        <MetodologiaHero heroImage={images.hero} />

        {/* 2 ── Nuestro enfoque */}
        <Enfoque aulaImage={images.aula} />

        {/* 3 ── Pilares */}
        <Pilares />

        {/* 4 ── Ciclo de aprendizaje */}
        <CicloAprendizaje />

        {/* 5 ── Un día en el jardín */}
        <DiaEnElJardin />

        {/* 6 ── Formulario de contacto */}
        <Contacto />
      </main>
      <Footer />
    </>
  )
}
