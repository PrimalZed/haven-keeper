import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabletopBottomComponent } from './components/tabletop-bottom/tabletop-bottom.component';
import { TabletopComponent } from './components/tabletop/tabletop.component';

const routes: Routes = [
  { path: '', component: TabletopComponent },
  { path: '', component: TabletopBottomComponent, outlet: 'bottom' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
