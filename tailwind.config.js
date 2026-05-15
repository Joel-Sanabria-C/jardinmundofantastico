/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow:     '#FFD600',
          orange:     '#FF8C00',
          red:        '#D32F2F',
          'red-dark': '#B71C1C',
          blue:       '#1A237E',
          'blue-mid': '#283593',
          'blue-lt':  '#3949AB',
          cream:      '#FFF8ED',
          green:      '#2E7D32',
        },
      },
      fontFamily: {
        display: ['var(--font-fredoka)', 'cursive'],
        body:    ['var(--font-nunito)',  'sans-serif'],
      },
      animation: {
        'float':      'float 3s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'fade-up':    'fadeUp 0.6s ease forwards',
        'bounce-in':  'bounceIn 0.6s cubic-bezier(.175,.885,.32,1.275) forwards',
        'slide-in':   'slideIn 0.5s ease forwards',
        'shimmer':    'shimmer 1.5s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'wave':       'wave 2.5s ease-in-out infinite',
      },
      keyframes: {
        float:    { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(-12px)' } },
        fadeUp:   { from:{ opacity:'0', transform:'translateY(28px)' }, to:{ opacity:'1', transform:'translateY(0)' } },
        bounceIn: { '0%':{ opacity:'0', transform:'scale(0.65)' }, '70%':{ transform:'scale(1.06)' }, '100%':{ opacity:'1', transform:'scale(1)' } },
        slideIn:  { from:{ opacity:'0', transform:'translateX(-28px)' }, to:{ opacity:'1', transform:'translateX(0)' } },
        shimmer:  { '0%':{ backgroundPosition:'-200% 0' }, '100%':{ backgroundPosition:'200% 0' } },
        wave:     { '0%,100%':{ transform:'rotate(-5deg)' }, '50%':{ transform:'rotate(5deg)' } },
      },
      backgroundImage: {
        'hero-gradient':    'linear-gradient(135deg,#FF8C00 0%,#FFD600 35%,#FF4500 70%,#D32F2F 100%)',
        'blue-gradient':    'linear-gradient(135deg,#1A237E 0%,#283593 50%,#1565C0 100%)',
        'red-gradient':     'linear-gradient(135deg,#D32F2F 0%,#B71C1C 100%)',
        'contact-gradient': 'linear-gradient(180deg,#1A237E 0%,#0D1260 100%)',
        'nosotros-hero':    'linear-gradient(135deg,#D32F2F 0%,#B71C1C 40%,#1A237E 100%)',
      },
      boxShadow: {
        card:      '0 8px 32px rgba(0,0,0,.12)',
        'card-lg': '0 20px 60px rgba(0,0,0,.22)',
        'glow-y':  '0 0 24px rgba(255,214,0,.55)',
        'glow-r':  '0 0 24px rgba(211,47,47,.45)',
        'glow-b':  '0 0 24px rgba(26,35,126,.45)',
      },
    },
  },
  plugins: [],
}
