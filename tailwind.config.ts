import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'media',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // "Clear Morning" — warm dawn-sky palette
        dawn: '#FFF6EE', // warm near-white page background
        haze: '#EAF2FB', // soft cool sky for the hero glow
        ink: '#1C2530', // warm-leaning near-black for headings
        muted: '#5B6573', // warm gray for body copy
        surface: '#FFFFFF', // card
        brand: {
          soft: '#E6F0FF',
          DEFAULT: '#0A7AFF', // Bluesky-true blue
          deep: '#0560D6'
        },
        honey: '#F4A93C', // the single warm spark
        success: '#0FA968',
        // warm darks (dark mode)
        night: '#15191F',
        'night-surface': '#1C222B'
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif']
      },
      boxShadow: {
        // warm/blue-tinted soft shadows instead of flat gray
        soft: '0 1px 2px rgba(28,37,48,0.04), 0 8px 24px rgba(28,37,48,0.06)',
        lift: '0 2px 4px rgba(28,37,48,0.05), 0 16px 40px rgba(10,122,255,0.10)',
        glow: '0 10px 40px rgba(10,122,255,0.18)'
      },
      borderRadius: {
        '2xl': '1.1rem',
        '3xl': '1.6rem'
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        rise: 'rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both'
      }
    }
  },
  plugins: []
};

export default config;
