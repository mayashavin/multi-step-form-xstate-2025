/** @type {import('tailwindcss').Config} */
import { getShadeVariants, getTintVariants } from './src/helpers/colorMix'

import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons'

export default {
  theme: {
    extend: {
      fontFamily: {
        custom: ['Gabarito'],
      },
      colors: {
        primary: {
          50: '#f9f8fc',
          100: '#f3f1fa',
          200: '#ddd4ef',
          300: '#c4b7e4',
          400: '#9e85d1',
          500: '#8a6fc9',
          600: '#7a5eb6',
          700: '#6a4da3',
          800: '#5a3c90',
          900: '#4a2b7d',
        },
        lavender: {
          ...getTintVariants('#f6f0fa'),
          500: '#f6f0fa',
          600: '#e8e0f5',
          700: '#d9d0f0',
          800: '#cbc0eb',
          900: '#b5a8e3',
        },
        aqua: {
          ...getTintVariants('#90dce8'),
          500: '#90dce8',
          ...getShadeVariants('#90dce8'),
        },
        pink: {
          ...getTintVariants('#fcb5d3'),
          500: '#fcb5d3',
          ...getShadeVariants('#fcb5d3'),
        },
        mute: {
          ...getTintVariants('#3b2d52'),
          500: '#3b2d52',
          ...getShadeVariants('#3b2d52'),
        },
        mayas: {
          default: '#8a6fc9',
          navy: '#566dbc',
        },
      },

      height: {
        fit: 'fit-content',
        150: '150px',
        300: '300px',
        350: '350px',
      },
      gridTemplateRows: {
        30: '1fr 30%',
      },
      width: {
        fit: 'fit-content',
        150: '150px',
        320: '320px',
        400: '380px',
      },
    },
  },
  variants: {},
  plugins: [
    iconsPlugin({
      collections: getIconCollections(['mingcute']),
    }),
  ],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    // any file containing the reference of CSS styles by class name.
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    safelist: [
      'dark-mode',
      'bg-aqua-500',
      'md:col-span-2',
      'w-14',
      'h-14',
      'i-mingcute-alert-octagon-line',
    ],
  },
}
