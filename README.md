# 🌟 Mundo Fantástico — Jardín Infantil

Next.js 14 · React 18 · Tailwind CSS · Framer Motion · Supabase

---

## 🗂️ Páginas incluidas

| Ruta        | Descripción                              |
|-------------|------------------------------------------|
| `/`         | Home: Hero, Niveles, Quiénes somos, Galería, Metodología, Contacto |
| `/nosotros` | Nosotros: Hero parallax, Objetivos, Visión, Misión, Contacto |

El botón **"Nosotros"** del Navbar y del Footer navega a `/nosotros`.

---

## 🚀 Instalación local

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.local.example .env.local
# → Edita .env.local con tus credenciales de Supabase

# 3. Correr en desarrollo
npm run dev
# → http://localhost:3000
```

---

## 🗄️ Configurar Supabase (imágenes)

### Paso 1 — Crear cuenta y proyecto
1. Ve a [supabase.com](https://supabase.com) → **Start for free**
2. Crea un nuevo proyecto (elige la región más cercana a Colombia)
3. Espera ~2 minutos a que inicialice

### Paso 2 — Crear tablas y bucket
1. En tu proyecto ve a **SQL Editor** → **New query**
2. Copia y pega el contenido de `supabase/schema.sql`
3. Haz clic en **Run** ✅

### Paso 3 — Subir imágenes
1. Ve a **Storage** en el panel de Supabase
2. Abre el bucket **imagenes** (ya creado por el SQL)
3. Crea las carpetas y sube imágenes:

```
imagenes/
├── hero/          ← 1 foto del hero de la página Nosotros (ej: graduacion.jpg)
├── objetivos/     ← 1-3 fotos de la sección Objetivos
├── vision/        ← 1-2 fotos de la sección Visión
├── mision/        ← 1-2 fotos de la sección Misión
└── galeria/       ← 5-10 fotos para la galería del Home
```

> 💡 **Tip**: Para crear carpetas en Supabase Storage, al subir un archivo escribe
> `hero/mi-foto.jpg` como nombre — automáticamente crea la carpeta `hero/`.

### Paso 4 — Obtener credenciales
1. Ve a **Settings** → **API**
2. Copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon / public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Paso 5 — Configurar .env.local
```env
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Resultado esperado
Cuando las imágenes estén en el bucket, el sitio las carga automáticamente.
Sin imágenes, muestra placeholders con emojis (el sitio siempre funciona).

---

## ☁️ Desplegar en Vercel

### Paso 1 — Subir a GitHub/GitLab/Bitbucket
```bash
git init
git add .
git commit -m "feat: mundo fantastico inicial"
git remote add origin https://github.com/TU_USUARIO/mundo-fantastico.git
git push -u origin main
```

### Paso 2 — Importar en Vercel
1. Ve a [vercel.com](https://vercel.com) → **Add New Project**
2. Importa tu repositorio
3. Framework: **Next.js** (detectado automáticamente)
4. En **Environment Variables** agrega:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://tu-proyecto.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGci...` |
| `NEXT_PUBLIC_SITE_URL` | `https://tu-dominio.vercel.app` |

5. Haz clic en **Deploy** ✅

### Paso 3 — Dominio personalizado (opcional)
En Vercel → Settings → Domains → Agrega tu dominio.

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── layout.js              ← Layout raíz (fuentes, metadata)
│   ├── page.js                ← Página Home (/)
│   ├── nosotros/
│   │   └── page.js            ← Página Nosotros (/nosotros)
│   └── api/
│       └── inscripciones/
│           └── route.js       ← API POST/GET inscripciones
├── components/
│   ├── layout/
│   │   ├── Navbar.js          ← Navegación compartida
│   │   └── Footer.js          ← Pie de página compartido
│   └── sections/
│       ├── Hero.js            ← Hero animado (Home)
│       ├── HomeSections.js    ← Niveles, QuienesSomos, Metodologia
│       ├── Galeria.js         ← Galería con imágenes de Supabase
│       ├── Contacto.js        ← Formulario compartido
│       └── nosotros/
│           └── NosotrosSections.js ← Hero, Objetivos, Vision, Mision
├── lib/
│   └── supabase/
│       ├── client.js          ← Cliente browser
│       ├── server.js          ← Cliente server (SSR)
│       └── images.js          ← Helpers para leer Storage
└── styles/
    └── globals.css            ← Tailwind + estilos globales
```

---

## 🔌 Cómo agregar más páginas

```bash
# Ejemplo: crear página /servicios
mkdir src/app/servicios
```

```jsx
// src/app/servicios/page.js
import Navbar   from '@/components/layout/Navbar'
import Footer   from '@/components/layout/Footer'
import Contacto from '@/components/sections/Contacto'

export const metadata = { title: 'Servicios' }

export default function ServiciosPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Tu contenido aquí */}
        <Contacto />
      </main>
      <Footer />
    </>
  )
}
```

Luego agrega el link en `Navbar.js`:
```js
{ label: 'Servicios', href: '/servicios' },
```

---

## 🖼️ Reemplazar placeholders por imágenes reales

En cualquier sección, cuando Supabase tiene imágenes, el componente las muestra
automáticamente con `next/image`. Si no hay imágenes, aparece el placeholder.

Para forzar una imagen local temporal:
```jsx
// En NosotrosSections.js, reemplaza ImgPlaceholder por:
<Image src="/images/mi-foto.jpg" alt="..." fill className="object-cover" />
// y pon la foto en /public/images/mi-foto.jpg
```
