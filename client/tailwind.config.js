/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      borderWidth: {
        '1.5': '1.5px',
      },
      colors: {
        'custom-gray-transparent': '#0000001a',
        whitesmoke: '#f5f5f5',
      },
      backgroundColor: {
        'custom-gray-transparent': '#0000001a',
      },
      fontFamily: {
        prompt: ['Prompt', 'sans-serif'],
      },
    }
  },
  plugins: []
};