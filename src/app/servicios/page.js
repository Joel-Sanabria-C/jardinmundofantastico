import Navbar   from '@/components/layout/Navbar'
import Footer   from '@/components/layout/Footer'
import Contacto from '@/components/sections/Contacto'
import {
  ServiciosHero,
  NivelesEducativos,
  QueIncluye,
  EntornoSeguro,
  ProcesoInscripcion,
} from '@/components/sections/servicios/ServiciosSections'
import { getServiciosImages } from '@/lib/images'

export const metadata = {
  title: 'Servicios',
  description:
    'Niveles de Párvulos y Transición para niños de 2 a 5 años: programa pedagógico, inglés, bellas artes y valores en Suba Bilbao, Bogotá.',
}

export default function ServiciosPage() {
  // Fotos locales en /public/images/servicios (placeholder si no existen)
  const images = getServiciosImages()

  return (
    <>
      <Navbar />
      <main>
        {/* 1 ── Hero con parallax */}
        <ServiciosHero heroImage={images.hero} />

        {/* 2 ── Niveles educativos */}
        <NivelesEducativos />

        {/* 3 ── Qué incluye */}
        <QueIncluye />

        {/* 4 ── Entorno seguro */}
        <EntornoSeguro instalacionesImage={images.instalaciones} />

        {/* 5 ── Proceso de inscripción */}
        <ProcesoInscripcion />

        {/* 6 ── Formulario de contacto */}
        <Contacto />
      </main>
      <Footer />
    </>
  )
}
