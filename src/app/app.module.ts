import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { MonsterSetComponent } from './components/monster/monster-set.component';
import { MonsterStatCardComponent } from './components/monster/monster-stat-card/monster-stat-card.component';
import { MonsterStandeeComponent } from './components/monster/standee/monster-standee.component';
import { TabletopComponent } from './components/tabletop/tabletop.component';
import { AnyPipe } from './pipes/any.pipe';
import { tabletopReducer } from 'store/tabletop/tabletop.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatModule } from './mat.module';

@NgModule({
  declarations: [
    AppComponent,
    MonsterSetComponent,
    MonsterStandeeComponent,
    MonsterStatCardComponent,
    TabletopComponent,

    AnyPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    LayoutModule,
    MatModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    StoreModule.forRoot({
      tabletop: tabletopReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
