import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as Qrious from 'qrious';
import { merge, of, Subject, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { QRIOUS_OPTIONS } from 'src/app/app.constants';
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
    @Inject(QRIOUS_OPTIONS) private qriousOptions: QRiousOptions,
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

  drawQrCode(answer: string, targetCanvas: HTMLElement) {
    if (!answer) {
      return;
    }

    new Qrious({
      ...this.qriousOptions,
      element: targetCanvas,
      value: answer
    });
  }
}
