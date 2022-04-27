import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from } from 'rxjs';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'store/app.state';
import { redo, redoSuccess, undo, undoSuccess } from './time-machine.actions';
import { selectFuture, selectPast } from './time-machine.selectors';

@Injectable()
export class TimeMachineEffects {
  undo$ = createEffect(() => this.actions$
    .pipe(
      ofType(undo),
      withLatestFrom(this.store.select(selectPast)),
      map(([undoAction, past]) => past
        .slice(past.length - undoAction.length)
        .reverse()
      ),
      mergeMap((undoPast) => from(
        undoPast
          .map((pastItem) => pastItem.reverseAction)
          .concat(undoSuccess({ undoneActions: undoPast.map((x) => x.originalAction) }))
      ))
    )
  );

  redo$ = createEffect(() => this.actions$
    .pipe(
      ofType(redo),
      withLatestFrom(this.store.select(selectFuture)),
      map(([redoAction, future]) => ({
        redoFuture: future
          .slice(undefined, redoAction.length),
        oldFuture: future
      })),
      mergeMap(({ redoFuture, oldFuture }) => from(
        redoFuture
          .map((futureAction) => futureAction)
          .concat(redoSuccess({ length: redoFuture.length, oldFuture }))
      ))
    )
  );
  
  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) { }
}
