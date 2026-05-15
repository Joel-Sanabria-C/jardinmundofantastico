import Navbar    from '@/components/layout/Navbar'
import Footer    from '@/components/layout/Footer'
import Hero      from '@/components/sections/Hero'
import Galeria   from '@/components/sections/Galeria'
import Contacto  from '@/components/sections/Contacto'
import { Niveles, QuienesSomos, Metodologia } from '@/components/sections/HomeSections'
import { getGaleriaImages, getHomeImages } from '@/lib/supabase/images'

export const metadata = {
  title: 'Mundo Fantástico — Jardín Infantil',
  description: 'Un lugar seguro para crecer y aprender. Educación inicial en Bogotá.',
}

export default async function HomePage() {
  // Carga en paralelo galería e imágenes de home
  let galeriaImages = []
  let homeImages    = { hero: null, quienessomos: null, todas: [] }

  try {
    const [galeria, home] = await Promise.all([
      getGaleriaImages(),
      getHomeImages(),
    ])
    galeriaImages = Array.isArray(galeria) ? galeria : []
    homeImages    = home ?? { hero: null, quienessomos: null, todas: [] }

    console.log(`[home] galería: ${galeriaImages.length} fotos`)
    console.log(`[home] hero: ${homeImages.hero?.name ?? 'no encontrado'}`)
    console.log(`[home] quienessomos: ${homeImages.quienessomos?.name ?? 'no encontrado'}`)
  } catch (err) {
    console.error('[home] Error cargando imágenes:', err.message)
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero recibe su imagen desde imagenes/home/hero.png */}
        <Hero heroImage={homeImages.hero} />
        <Niveles />
        {/* QuienesSomos recibe quienessomos.png */}
        <QuienesSomos homeImages={homeImages} />
        <Galeria images={galeriaImages} />
        <Metodologia />
        <Contacto />
      </main>
      <Footer />
    </>
  )
}
