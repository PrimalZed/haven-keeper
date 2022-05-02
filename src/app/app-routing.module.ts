import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabletopComponent } from './components/tabletop/tabletop.component';

const routes: Routes = [
  { path: '', component: TabletopComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
