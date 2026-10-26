import '@/styles/globals.css'

export const metadata = {
  title: { default:'Mundo Fantástico — Jardín Infantil', template:'%s | Mundo Fantástico' },
  description: 'Un lugar seguro para crecer y aprender. Educación inicial con amor, juego y creatividad en Bogotá.',
  keywords: ['jardín infantil','preescolar','Bogotá','Suba Bilbao','educación inicial','Mundo Fantástico'],
  openGraph: { title:'Mundo Fantástico — Jardín Infantil', description:'Educación inicial con amor, juego y creatividad.', type:'website' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Fuentes: Fredoka (títulos) + Nunito (texto) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600&family=Nunito:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
