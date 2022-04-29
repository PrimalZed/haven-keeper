import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDBPDatabase, IDBPObjectStore, IDBPTransaction, openDB } from 'idb';
import { PersistenceDbSchema } from 'persistence/persistence.db-schema';
import { StoreName } from 'persistence/store-name';
import { from } from 'rxjs';
import { distinct, filter, skip, switchMap, tap } from 'rxjs/operators';
import { AppState } from 'store/app.state';
import { loadTabletop } from 'store/tabletop/tabletop.actions';
import { selectTabletopState } from 'store/tabletop/tabletop.selectors';
import { TabletopState } from 'store/tabletop/tabletop.state';

@Injectable({ providedIn: 'root' })
export abstract class PersistenceService implements OnDestroy {
  private dbPromise = openDB<PersistenceDbSchema>('haven-keeper', 1, { upgrade: this.upgrade });

  private save$ = this.store.select(selectTabletopState)
    .pipe(
      skip(1),
      distinct(),
      switchMap((state) => this.dbPromise
        .then((db) => db.put('tabletops', state, 0))
      )
    );
  
  private subscription = this.save$
    .subscribe();

  constructor(private store: Store<AppState>) { }
  
  private upgrade(
    db: IDBPDatabase<PersistenceDbSchema>, oldVersion: number,
    newVersion: number,
    transaction: IDBPTransaction<PersistenceDbSchema, StoreName[], 'versionchange'>
  ) {
    const tabletopsStore: IDBPObjectStore<PersistenceDbSchema, StoreName[], 'tabletops', 'versionchange'> = oldVersion < 1
      ? db.createObjectStore('tabletops', { autoIncrement: true })
      : transaction.objectStore('tabletops');
  }

  initialize() {
    return from(this.dbPromise)
      .pipe(
        switchMap((db) => db.get('tabletops', 0)),
        filter((state): state is TabletopState => Boolean(state)),
        tap((state) => {
          this.store.dispatch(loadTabletop({ state }));
        })
      );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
