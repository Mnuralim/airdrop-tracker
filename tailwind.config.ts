import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // Enable dark mode with a class
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#000', // Dark background for Vercel-like appearance
        darkCard: '#111', // Darker shades for cards and containers
        darkText: '#eaeaea', // Light gray for text
        darkAccent: '#333', // Darker gray for accents (borders, etc.)
        primary: '#3b82f6', // Vercel-like primary button color
        secondary: '#888', // Secondary text color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Use Inter font for clean look
      },
    },
  },
  plugins: [],
}
export default config
