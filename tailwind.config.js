export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0b1120',
        surfaceSoft: '#111827',
        accent: '#7c3aed',
        accentSoft: '#a78bfa'
      },
      boxShadow: {
        glass: '0 20px 60px rgba(15, 23, 42, 0.25)',
        glow: '0 0 60px rgba(124, 58, 237, 0.18)'
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top, rgba(124, 58, 237, 0.2), transparent 35%)'
      }
    }
  }
}
