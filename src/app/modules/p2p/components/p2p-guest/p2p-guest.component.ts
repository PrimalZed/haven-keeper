import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fromEvent, merge, of, Subject, timer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AppState } from 'store/app.state';
import { receiveHostOffer } from 'store/p2p/p2p.actions';
import { selectGuestAnswer, selectGuestP2pState } from 'store/p2p/p2p.selectors';

@Component({
  selector: 'p2p-guest',
  templateUrl: './p2p-guest.component.html',
  styleUrls: ['./../../p2p.component.scss'],
  animations: [
    trigger(
      'fadeOut',
      [
        transition(':leave', animate('500ms', style({ opacity: 0 }))),
      ]
    )
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class P2pGuestComponent implements OnDestroy {
  tabIndex: number = 0;

  private state$ = this.store.select(selectGuestP2pState);

  connectionState$ = this.state$
    .pipe(
      map((state) => state?.connection?.connectionState === 'connected'
        ? 'connected'
        : 'pending'
      )
    );
  answer$ = this.store.select(selectGuestAnswer);

  private releaseGuestState$ = this.state$
    .pipe(
      map((state) => state?.connection),
      switchMap((connection) => connection
        ? fromEvent(connection, 'connectionstatechange')
        : of(void(0))
      ),
      map(() => void(0)),
      tap(() => {
        selectGuestP2pState.release();
      })
    );

  private showCopiedSubject: Subject<void> = new Subject();
  showCopied$ = this.showCopiedSubject
    .pipe(
      switchMap(() => merge(of(true), timer(2000).pipe(map(() => false))))
    );

  private subscription = this.releaseGuestState$.subscribe();

  constructor(
    private store: Store<AppState>
  ) { }

  receiveHostOffer(form: FormGroup) {
    if (!form.valid) {
      return;
    }
    this.store.dispatch(receiveHostOffer({ offer: form.value.offer }));
  }

  receiveQrCode(offer: string) {
    this.store.dispatch(receiveHostOffer({ offer }));
  }

  copyAnswerCode(answer: string) {
    navigator.clipboard.writeText(answer);
    this.showCopiedSubject.next();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
