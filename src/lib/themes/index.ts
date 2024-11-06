import { createTheme } from '@mantine/core'

export const theme = createTheme({
  scale: 1.025,
  primaryColor: 'primary',
  primaryShade: {
    light: 6,
    dark: 6,
  },
  autoContrast: true,
  colors: {
    primary: [
      '#dcfce7',
      '#bbf7d0',
      '#86efac',
      '#4ade80',
      '#22c55e',
      '#16a34a',
      '#15803d',
      '#166534',
      '#14532d',
      '#052e16',
    ],
    zinc: [
      '#f4f4f5',
      '#e4e4e7',
      '#d4d4d8',
      '#a1a1aa',
      '#71717a',
      '#52525b',
      '#3f3f46',
      '#27272a',
      '#18181b',
      '#09090b',
    ],
    accent: [
      '#fffae1',
      '#fff3cb',
      '#ffe69a',
      '#ffd864',
      '#ffcd38',
      '#ffc51c',
      '#ffc209',
      '#e3aa00',
      '#ca9700',
      '#af8200',
    ],
  },

  defaultRadius: 'xl',
  fontFamily:
    'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
  headings: {
    fontFamily:
      'Eudoxus Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
  },
})
