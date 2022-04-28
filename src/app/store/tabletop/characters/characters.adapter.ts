import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Character } from 'models/character';

export const charactersAdapter: EntityAdapter<Character> = createEntityAdapter<Character>({
  selectId: (character: Character) => character.key
});
