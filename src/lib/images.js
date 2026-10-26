// ─────────────────────────────────────────────────────────────
//  lib/images.js
//  Imágenes locales servidas desde /public/images
//
//  Para poner una foto real basta con copiarla en la carpeta
//  indicada con ese nombre exacto. Si el archivo no existe,
//  la sección muestra su placeholder con emoji.
//
//  public/images/
//  ├── nosotros/hero.jpg        → Hero de Nosotros
//  ├── nosotros/objetivos.jpg   → Sección Objetivos
//  ├── nosotros/vision.jpg      → Fondo de Visión
//  ├── nosotros/mision.jpg      → Sección Misión
//  ├── metodologia/hero.jpg     → Hero de Metodología
//  ├── metodologia/aula.jpg     → Foto "Nuestro enfoque"
//  ├── servicios/hero.jpg       → Hero de Servicios
//  └── servicios/instalaciones.jpg → Foto "Un entorno seguro"
// ─────────────────────────────────────────────────────────────
import fs from 'fs'
import path from 'path'

const EXTENSIONES = ['.jpg', '.jpeg', '.png', '.webp', '.svg']

/**
 * Busca /public/images/<ruta>.(jpg|jpeg|png|webp) y devuelve
 * { publicUrl } si existe, o null si todavía no se ha subido.
 * Se ejecuta en el servidor (en build), así que no pesa en el navegador.
 * @param {string} ruta - ruta sin extensión, ej: 'nosotros/hero'
 */
export function localImage(ruta) {
  for (const ext of EXTENSIONES) {
    const archivo = path.join(process.cwd(), 'public', 'images', `${ruta}${ext}`)
    if (fs.existsSync(archivo)) return { publicUrl: `/images/${ruta}${ext}` }
  }
  return null
}

export function getNosotrosImages() {
  const lista = (r) => { const img = localImage(r); return img ? [img] : [] }
  return {
    hero:      lista('nosotros/hero'),
    objetivos: lista('nosotros/objetivos'),
    vision:    lista('nosotros/vision'),
    mision:    lista('nosotros/mision'),
  }
}

export function getMetodologiaImages() {
  return {
    hero: localImage('metodologia/hero'),
    aula: localImage('metodologia/aula'),
  }
}

export function getServiciosImages() {
  return {
    hero:          localImage('servicios/hero'),
    instalaciones: localImage('servicios/instalaciones'),
  }
}
