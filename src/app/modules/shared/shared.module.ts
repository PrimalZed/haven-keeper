import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatModule } from 'src/app/mat.module';
import { LayoutComponent } from './components/layout/layout.component';
import { NgAfterViewInitDirective } from './directives/ng-after-view-init.directive';
import { AnyPipe } from './pipes/any.pipe';

@NgModule({
  declarations: [
    LayoutComponent,

    NgAfterViewInitDirective,

    AnyPipe
  ],
  imports: [
    FormsModule,
    MatModule,
    RouterModule
  ],
  exports: [
    LayoutComponent,

    NgAfterViewInitDirective,

    AnyPipe,

    FormsModule,
    MatModule
  ]
})
export class SharedModule { }
