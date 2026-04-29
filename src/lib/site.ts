export const SITE = {
  url: 'https://www.samsonchow.ca',
  name: 'PokerTools',
  defaultTitle: 'PokerTools — Free Home Game Tools',
  defaultDescription:
    'Free poker session tracker, blinds timer, chip calculator, and bomb-pot helper for home games. No sign-up — open it and use it.',
  ogImage: '/og-image.png',
} as const;

export const NAV = [
  { path: '/', label: 'Session' },
  { path: '/timer', label: 'Timer' },
  { path: '/chips', label: 'Chips' },
  { path: '/bomb-pot', label: 'Bomb Pot' },
] as const;
