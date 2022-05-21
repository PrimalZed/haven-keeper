import { Character } from './character';

export type Card =
  | (Character & { kind: 'character' })
  | { kind: 'monster', key: string };
