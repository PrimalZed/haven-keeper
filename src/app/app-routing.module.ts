import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabletopComponent } from 'components/tabletop/tabletop.component';

const routes: Routes = [
  { path: '', component: TabletopComponent },
  { path: 'p2p', loadChildren: () => import('./modules/p2p/p2p.module').then(m => m.P2pModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
