-- ══════════════════════════════════════════════════════════════
--  Mundo Fantástico — Supabase SQL Schema
--  Pega este script en: Supabase Dashboard → SQL Editor → Run
-- ══════════════════════════════════════════════════════════════

-- ── 1. Tabla de inscripciones ─────────────────────────────────
CREATE TABLE IF NOT EXISTS public.inscripciones (
  id               uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre_nino      text        NOT NULL,
  edad_nino        text,
  nombre_acudiente text        NOT NULL,
  telefono         text        NOT NULL,
  correo           text,
  nivel_interes    text,
  mensaje          text,
  estado           text        DEFAULT 'pendiente'
                               CHECK (estado IN ('pendiente','contactado','inscrito','descartado')),
  created_at       timestamptz DEFAULT now()
);

ALTER TABLE public.inscripciones ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede insertar (formulario público)
CREATE POLICY "insert_inscripciones" ON public.inscripciones
  FOR INSERT TO anon WITH CHECK (true);

-- Solo autenticados leen
CREATE POLICY "select_inscripciones" ON public.inscripciones
  FOR SELECT TO authenticated USING (true);

-- ── 2. Storage bucket "imagenes" ──────────────────────────────
-- Ejecuta esto en SQL Editor de Supabase:
INSERT INTO storage.buckets (id, name, public)
VALUES ('imagenes', 'imagenes', true)
ON CONFLICT (id) DO NOTHING;

-- Política: lectura pública
CREATE POLICY "imagenes_public_read" ON storage.objects
  FOR SELECT TO anon
  USING (bucket_id = 'imagenes');

-- Política: solo autenticados suben
CREATE POLICY "imagenes_auth_upload" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'imagenes');

-- Política: solo autenticados eliminan
CREATE POLICY "imagenes_auth_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'imagenes');

-- ══════════════════════════════════════════════════════════════
--  ESTRUCTURA DEL BUCKET "imagenes"
--  Crear estas carpetas subiendo un archivo en cada una:
--
--  imagenes/
--  ├── hero/          ← Hero de Nosotros (1 foto principal)
--  ├── objetivos/     ← Sección Objetivos en Nosotros
--  ├── vision/        ← Sección Visión en Nosotros
--  ├── mision/        ← Sección Misión en Nosotros
--  └── galeria/       ← Galería de la página Home
-- ══════════════════════════════════════════════════════════════
