export type DonutFlavor = 'pink' | 'blue' | 'yellow' | 'purple';

export interface DonutTheme {
  id: DonutFlavor;
  name: string;
  tagline: string;
  description: string;
  modelPath: string;
}

export const DONUT_THEMES: DonutTheme[] = [
  {
    id: 'pink',
    name: 'Strawberry Bliss',
    tagline: 'Sweet & Dreamy',
    description: 'A delicate dance of strawberry cream and rose-tinted sugar.',
    modelPath: '/models/pink-donut.glb',
  },
  {
    id: 'blue',
    name: 'Ocean Breeze',
    tagline: 'Cool & Refreshing',
    description: 'Dive into waves of blueberry and cool mint sensation.',
    modelPath: '/models/blue-donut.glb',
  },
  {
    id: 'yellow',
    name: 'Citrus Sunrise',
    tagline: 'Bright & Energetic',
    description: 'Burst of lemon zest and golden honey sunshine.',
    modelPath: '/models/yellow-donut.glb',
  },
  {
    id: 'purple',
    name: 'Berry Magic',
    tagline: 'Rich & Mysterious',
    description: 'Enchanting blackberry and lavender twilight.',
    modelPath: '/models/purple-donut.glb',
  },
];
