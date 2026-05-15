// http://localhost:3000/api/debug-storage
// Elimina antes de subir a producción

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createClient()
    const BUCKET = 'fotosjardin'

    const probe = async (path) => {
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .list(path, { limit: 50, sortBy: { column: 'name', order: 'asc' } })

      if (error) return { error: error.message, carpetas: [], archivos: [] }

      const carpetas = data?.filter(f => !f.id).map(f => f.name) ?? []
      const archivos = data?.filter(f => f.id && !f.name.startsWith('.')).map(f => ({
        nombre: f.name,
        url: supabase.storage.from(BUCKET).getPublicUrl(`${path}/${f.name}`).data.publicUrl,
      })) ?? []

      return { error: null, carpetas, archivos }
    }

    const [imagenes, galeriaHome, home, nosotros] = await Promise.all([
      probe('imagenes'),
      probe('imagenes/galeria/home'),
      probe('imagenes/home'),
      probe('imagenes/nosotros'),
    ])

    return NextResponse.json({
      ok: true,
      bucket: BUCKET,
      rutas: {
        'imagenes/':              imagenes,
        'imagenes/galeria/home/': galeriaHome,
        'imagenes/home/':         home,
        'imagenes/nosotros/':     nosotros,
      },
    })
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}