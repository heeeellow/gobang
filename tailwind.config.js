module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace']
      },
      colors: {
        primary: {
          FROM: '#6366f1',
          TO: '#8b5cf6'
        }
      }
    }
  },
  plugins: []
}
