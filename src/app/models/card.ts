import { Character } from './character';
import { MonsterSet } from './monster-set';

export type Card =
  | (Character & { kind: 'character' })
  | (MonsterSet & { kind: 'monster' });
