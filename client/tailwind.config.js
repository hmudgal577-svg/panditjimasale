module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        maroon: { DEFAULT: '#7A1E1E', light: '#9B2D2D', dark: '#5C1515' },
        saffron: { DEFAULT: '#E8862A', light: '#F0A45A', dark: '#D4731E' },
        gold: { DEFAULT: '#D4AF37', light: '#E0C35A', dark: '#B8962E' },
        cream: { DEFAULT: '#FFF8EE', dark: '#F5ECD8' },
        darkbrown: { DEFAULT: '#2B1B12', light: '#4A3025' },
      },
      fontFamily: {
        heading: ['Georgia', 'Times New Roman', 'serif'],
        body: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(10px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        slideDown: { '0%': { transform: 'translateY(-10px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
      },
    },
  },
  plugins: [],
};
