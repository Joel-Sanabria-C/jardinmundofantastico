import Navbar   from '@/components/layout/Navbar'
import Footer   from '@/components/layout/Footer'
import Contacto from '@/components/sections/Contacto'
import { NosotrosHero, Objetivos, Vision, Mision } from '@/components/sections/nosotros/NosotrosSections'
import { getNosotrosImages } from '@/lib/supabase/images'

export const metadata = {
  title: 'Nosotros — Mundo Fantástico',
  description: 'Conoce nuestra misión, visión y objetivos.',
}

const EMPTY = { hero:null, objetivos:null, vision:null, mision:null, todas:[] }

export default async function NosotrosPage() {
  let images = EMPTY

  try {
    const result = await getNosotrosImages()
    images = result ?? EMPTY
    console.log('[nosotros] hero:',      images.hero?.name      ?? 'no encontrado')
    console.log('[nosotros] objetivos:', images.objetivos?.name ?? 'no encontrado')
    console.log('[nosotros] vision:',    images.vision?.name    ?? 'no encontrado')
    console.log('[nosotros] mision:',    images.mision?.name    ?? 'no encontrado')
  } catch (err) {
    console.error('[nosotros] Error:', err.message)
  }

  return (
    <>
      <Navbar/>
      <main className="pt-0">
        {/* hero.png → fondo del título NOSOTROS */}
        <NosotrosHero heroImage={images.hero}/>

        {/* objetivos.png → foto derecha de Objetivos */}
        <Objetivos objetivosImg={images.objetivos}/>

        {/* vision.jpeg → fondo de la sección Visión */}
        <Vision visionImg={images.vision}/>

        {/* mision.jpeg → foto izquierda de Misión */}
        <Mision misionImg={images.mision}/>

        <Contacto/>
      </main>
      <Footer/>
    </>
  )
}
