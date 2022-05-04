import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { merge, of, Subject, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppState } from 'store/app.state';
import { receiveGuestAnswer } from 'store/p2p/p2p.actions';

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
  @Input() guest!: { state: 'stable', name: string } | { state: 'pending', name: string, offer: string | undefined };

  private showCopiedSubject: Subject<void> = new Subject();
  showCopied$ = this.showCopiedSubject
    .pipe(
      switchMap(() => merge(of(true), timer(2000).pipe(map(() => false))))
    );

  constructor(private store: Store<AppState>) { }

  changeName(name: string) {
    alert("Not Yet Implemented");
  }

  copyOfferCode(offer: string | undefined) {
    if (!offer) {
      return;
    }

    navigator.clipboard.writeText(offer);
    this.showCopiedSubject.next();
  }

  receiveGuestAnswer(form: FormGroup) {
    if (!form.valid) {
      return;
    }

    this.store.dispatch(receiveGuestAnswer({ index: this.index, answer: form.value.answer }));
  }

  remove() {
    alert("Not Yet Implemented");
  }
}
