import { createClient } from './server'

const BUCKET = 'fotosjardin'

const PATHS = {
  galeriaHome: 'imagenes/galeria/home',
  home:        'imagenes/home',
  nosotros:    'imagenes/nosotros',
}

export async function listImages(folder = '') {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .list(folder, { sortBy: { column: 'name', order: 'asc' } })

    if (error) {
      console.error(`[images] Error listando "${BUCKET}/${folder}":`, error.message)
      return []
    }
    if (!data || data.length === 0) return []

    return data
      .filter(f => f.id && !f.name.startsWith('.') && f.name !== '.emptyFolderPlaceholder')
      .map(file => {
        const filePath = `${folder}/${file.name}`
        const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(filePath)
        return {
          name:      file.name,
          path:      filePath,
          publicUrl: urlData.publicUrl,
        }
      })
  } catch (err) {
    console.error(`[images] Excepción listImages("${folder}"):`, err.message)
    return []
  }
}

// Galería Home → imagenes/galeria/home/ → Galeria1.jpeg … Galeria6.jpeg
export async function getGaleriaImages() {
  const imgs = await listImages(PATHS.galeriaHome)
  console.log(`[images] galeria/home: ${imgs.length} fotos`)
  return imgs
}

// imagenes/home/ → hero.png, quienessomos.png
export async function getHomeImages() {
  const imgs = await listImages(PATHS.home)
  const find = (kw) => imgs.find(f => f.name.toLowerCase().includes(kw)) ?? null
  return {
    hero:        find('hero'),
    quienessomos: find('quienes'),
    todas: imgs,
  }
}

// imagenes/nosotros/ → hero.png, mision.jpeg, objetivos.png, vision.jpeg
export async function getNosotrosImages() {
  const EMPTY = { hero: null, objetivos: null, vision: null, mision: null, todas: [] }
  try {
    const todas = await listImages(PATHS.nosotros)
    console.log(`[images] nosotros: ${todas.length} fotos →`, todas.map(f => f.name))
    if (!todas || todas.length === 0) return EMPTY

    const find = (kw) =>
      todas.find(f => f.name.toLowerCase().includes(kw.toLowerCase())) ?? null

    return {
      hero:      find('hero'),
      objetivos: find('objetivos'),
      vision:    find('vision'),
      mision:    find('mision'),
      todas,
    }
  } catch (err) {
    console.error('[images] Error getNosotrosImages:', err.message)
    return EMPTY
  }
}

export function getPublicUrl(path) {
  try {
    const supabase = createClient()
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
    return data.publicUrl
  } catch { return '' }
}
