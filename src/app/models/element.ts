export type Element = 'fire' | 'ice' | 'air' | 'earth' | 'light' | 'dark';

export type MixedElement = 
  | 'fireIce' | 'fireAir' | 'fireEarth' | 'fireLight' | 'fireDark'
  | 'iceAir' | 'iceEarth' | 'iceLight' | 'iceDark'
  | 'airEarth' | 'airLight' | 'airDark'
  | 'earthLight' | 'earthDark'
  | 'lightDark'
  | 'wild';

export type ElementalInfusion = 'inert' | 'waning' | 'strong';
