import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      colors: {
        bg:        'oklch(98.5% 0.004 245)',
        surface:   'oklch(96%   0.006 245)',
        border:    'oklch(86%   0.010 245)',
        text:      'oklch(18%   0.012 245)',
        'text-2':  'oklch(42%   0.010 245)',
        'text-3':  'oklch(60%   0.008 245)',
        accent:    'oklch(38%   0.12  250)',
      },
    },
  },
  plugins: [],
};

export default config;
