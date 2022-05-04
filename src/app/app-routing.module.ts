import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { P2pComponent } from 'components/p2p/p2p.component';
import { TabletopComponent } from 'components/tabletop/tabletop.component';

const routes: Routes = [
  { path: '', component: TabletopComponent },
  { path: 'p2p', component: P2pComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
