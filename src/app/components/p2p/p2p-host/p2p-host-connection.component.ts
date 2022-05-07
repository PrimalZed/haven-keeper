import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as QrCode from 'qrcode';
import { merge, of, Subject, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppState } from 'store/app.state';
import { closeConnection, receiveGuestAnswer, setGuestConnectionName } from 'store/p2p/p2p.actions';
import { GuestConnection } from 'store/p2p/p2p.selectors';

@Component({
  selector: 'p2p-host-connection',
  templateUrl: './p2p-host-connection.component.html',
  styleUrls: ['./../p2p.component.scss',],
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
export class P2pHostConnectionComponent {
  @Input() index!: number;
  @Input() guest!: GuestConnection;

  tabIndex: number = 0;

  private showCopiedSubject: Subject<void> = new Subject();
  showCopied$ = this.showCopiedSubject
    .pipe(
      switchMap(() => merge(of(true), timer(2000).pipe(map(() => false))))
    );

  constructor(private store: Store<AppState>) { }

  changeName(name: string) {
    this.store.dispatch(setGuestConnectionName({ index: this.index, name }));
  }

  copyOfferCode(offer: string | undefined) {
    if (!offer) {
      return;
    }

    navigator.clipboard.writeText(offer);
    this.showCopiedSubject.next();
  }

  drawQrCode(offer: string | undefined, targetCanvas: HTMLElement) {
    if (!offer) {
      return;
    }

    QrCode.toCanvas(targetCanvas, offer, { color: { dark: '#303030', light: '#ffffffb3'}});
  }

  receiveGuestAnswer(form: FormGroup) {
    if (!form.valid) {
      return;
    }

    this.store.dispatch(receiveGuestAnswer({ index: this.index, answer: form.value.answer }));
  }

  receiveQrCode(answer: string) {
    this.store.dispatch(receiveGuestAnswer({ index: this.index, answer }));
  }

  remove() {
    this.store.dispatch(closeConnection({ index: this.index }));
  }
}
