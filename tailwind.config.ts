import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      height: {
        '516': '516px',
        '370': '370px',
      },
      spacing: {
        '7.5': '30px',
      },
    },
    colors: {
      gray: "#D9D9D9",
      blue: "#3160D8",
      bg: "#F7F7F7",
      white: "#FFFFFF",
    }
  },
  plugins: [], 
};
export default config;
