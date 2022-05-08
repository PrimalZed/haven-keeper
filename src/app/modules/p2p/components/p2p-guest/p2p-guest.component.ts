import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { merge, of, Subject, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppState } from 'store/app.state';
import { receiveHostOffer } from 'store/p2p/p2p.actions';
import { selectGuestAnswer } from 'store/p2p/p2p.selectors';

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
export class P2pGuestComponent {
  tabIndex: number = 0;
  answer$ = this.store.select(selectGuestAnswer);

  private showCopiedSubject: Subject<void> = new Subject();
  showCopied$ = this.showCopiedSubject
    .pipe(
      switchMap(() => merge(of(true), timer(2000).pipe(map(() => false))))
    );

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
}
