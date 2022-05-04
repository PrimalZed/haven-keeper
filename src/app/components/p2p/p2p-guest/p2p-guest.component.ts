import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'store/app.state';
import { receiveHostOffer } from 'store/p2p/p2p.actions';
import { selectGuestAnswer } from 'store/p2p/p2p.selectors';

@Component({
  selector: 'p2p-guest',
  templateUrl: './p2p-guest.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class P2pGuestComponent {
  answer$ = this.store.select(selectGuestAnswer);

  constructor(private store: Store<AppState>) { }

  receiveHostOffer(form: FormGroup) {
    if (!form.valid) {
      return;
    }
    this.store.dispatch(receiveHostOffer({ offer: form.value.offer }));
  }
}
