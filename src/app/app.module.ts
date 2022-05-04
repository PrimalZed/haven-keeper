import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { LayoutComponent } from 'components/layout/layout.component';
import { P2pComponent } from './components/p2p/p2p.component';
import { P2pBottomComponent } from './components/p2p/p2p-bottom/p2p-bottom.component';
import { P2pGuestComponent } from './components/p2p/p2p-guest/p2p-guest.component';
import { P2pMainComponent } from './components/p2p/p2p-main.component';
import { P2pHostComponent } from './components/p2p/p2p-host/p2p-host.component';
import { P2pHostConnectionComponent } from 'components/p2p/p2p-host/p2p-host-connection.component';
import { P2pTopComponent } from './components/p2p/p2p-top/p2p-top.component';
import { AddCardDialogComponent } from './components/tabletop/add-card-dialog/add-card-dialog.component';
import { CharacterInitiativeDialogComponent } from './components/tabletop/character-initiative-dialog/character-initiative-dialog.component';
import { CharacterComponent } from './components/tabletop/character/character.component';
import { MonsterSetComponent } from './components/tabletop/monster/monster-set.component';
import { AddStandeeDialogComponent } from './components/tabletop/monster/add-standee-dialog/add-standee-dialog.component';
import { MonsterAbilityCardComponent } from './components/tabletop/monster/monster-ability-card/monster-ability-card.component';
import { MonsterStatCardComponent } from './components/tabletop/monster/monster-stat-card/monster-stat-card.component';
import { MonsterStandeeComponent } from './components/tabletop/monster/standee/monster-standee.component';
import { TabletopBottomComponent } from './components/tabletop/tabletop-bottom/tabletop-bottom.component';
import { TabletopTopComponent } from './components/tabletop/tabletop-top/tabletop-top.component';
import { TabletopComponent } from './components/tabletop/tabletop.component';
import { TabletopMainComponent } from './components/tabletop/tabletop-main.component';
import { GlidePositionDirective } from './directives/glide-position.directive';
import { AnyPipe } from './pipes/any.pipe';
import { ModifierPipe } from './pipes/modifier.pipe';
import { CatalogService } from 'services/catalog.service';
import { PersistenceService } from 'services/persistence.service';
import { TabletopService } from 'services/tabletop.service';
import { APP_REDUCERS, getReducers } from 'store/app.reducers';
import { P2pEffects } from 'store/p2p/p2p.effects';
import { MonstersEffects } from 'store/tabletop/monsters/monsters.effects';
import { TimeMachineEffects } from 'store/time-machine/time-machine.effects';
import { timeMachineMetaReducers } from 'store/time-machine/time-machine.meta-reducers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatModule } from './mat.module';

@NgModule({
  declarations: [
    AddCardDialogComponent,
    AddStandeeDialogComponent,
    AppComponent,
    CharacterComponent,
    CharacterInitiativeDialogComponent,
    LayoutComponent,
    MonsterAbilityCardComponent,
    MonsterSetComponent,
    MonsterStandeeComponent,
    MonsterStatCardComponent,
    P2pComponent,
    P2pBottomComponent,
    P2pMainComponent,
    P2pHostComponent,
    P2pHostConnectionComponent,
    P2pGuestComponent,
    P2pTopComponent,
    TabletopComponent,
    TabletopBottomComponent,
    TabletopMainComponent,
    TabletopTopComponent,

    GlidePositionDirective,

    AnyPipe,
    ModifierPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    EffectsModule.forRoot([MonstersEffects, P2pEffects, TimeMachineEffects]),
    FormsModule,
    HttpClientModule,
    LayoutModule,
    MatModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    StoreModule.forRoot(APP_REDUCERS, { metaReducers: [...timeMachineMetaReducers], runtimeChecks: { strictStateImmutability: false, strictActionImmutability: false }})
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (catalogService: CatalogService) => () => catalogService.initialize(),
      deps: [CatalogService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (persistenceService: PersistenceService) => () => persistenceService.initialize(),
      deps: [PersistenceService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (tabletopService: TabletopService) => () => tabletopService.initialize(),
      deps: [TabletopService],
      multi: true
    },
    {
      provide: APP_REDUCERS,
      useFactory: getReducers,
      deps: [CatalogService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
