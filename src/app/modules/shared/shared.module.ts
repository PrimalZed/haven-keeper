import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatModule } from 'src/app/mat.module';
import { LayoutComponent } from './components/layout/layout.component';
import { NgAfterViewInitDirective } from './directives/ng-after-view-init.directive';

@NgModule({
  declarations: [
    LayoutComponent,

    NgAfterViewInitDirective
  ],
  imports: [
    FormsModule,
    MatModule,
    RouterModule
  ],
  exports: [
    LayoutComponent,

    NgAfterViewInitDirective,

    FormsModule,
    MatModule
  ]
})
export class SharedModule { }
