import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Bricolage Grotesque Variable', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        transparent: 'transparent',
        blackie: '#02040f',
        baby_powder: "#fffffc",
        khaki_web: "#beb7a4",
        amber_SAE_ECE: "#ff7f11",
        coqueilcot: "#ff3f00"
      }
    }
  },

  plugins: [typography, forms, containerQueries]
};
