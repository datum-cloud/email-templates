import { pixelBasedPreset, type TailwindConfig } from '@react-email/components';

/**
 * Centralized Tailwind configuration for all email templates
 * This ensures consistent styling across all email communications
 */
export const emailTailwindConfig: TailwindConfig = {
  presets: [pixelBasedPreset],
  theme: {
    extend: {
      colors: {
        // Brand colors - customize these for your brand
        brand: {
          navy: '#0c1d31',
          cream: '#f6f6f5',
          'light-gray': '#E8E7E4',
          'lime-green': '#e6f59f',
          'dark-navy-blue': '#111e34',
          'light-pink': '#ecd0d0',
          mauve: '#91757b',
          'navy-muted': '#14233d',
          orange: '#ff6b35',
          tuscany: '#c49d9d',
          indigo: '#2d3948',
          'pearl-gray': '#efefed',
          'green-dark': '#4d6356',
          'warm-white': '#f5f5f3',
          'canyon-clay': '#BF9595',
        },
      },
      fontSize: {
        sm: '13px',
        '4.5': '17px',
        '5.5': '22px',
        '2xl': '28px',
      },
      spacing: {
        '4.5': '17px',
        '5.5': '22px',
        '10.5': '42px',
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
    },
  },
};
