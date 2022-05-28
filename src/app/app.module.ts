import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { AddCardDialogComponent } from './components/tabletop/add-card-dialog/add-card-dialog.component';
import { CharacterInitiativeDialogComponent } from './components/tabletop/character-initiative-dialog/character-initiative-dialog.component';
import { CharacterComponent } from './components/tabletop/character/character.component';
import { ConditionComponent } from './components/tabletop/condition/condition.component';
import { ConditionToggleComponent } from './components/tabletop/condition-toggle/condition-toggle.component';
import { EffectComponent } from './components/tabletop/effect/effect.component';
import { ElementIceComponent } from './components/tabletop/elements/element-ice/element-ice.component';
import { ElementAirComponent } from './components/tabletop/elements/element-air/element-air.component';
import { ElementDarkComponent } from './components/tabletop/elements/element-dark/element-dark.component';
import { ElementEarthComponent } from './components/tabletop/elements/element-earth/element-earth.component';
import { ElementFireComponent } from './components/tabletop/elements/element-fire/element-fire.component';
import { ElementLightComponent } from './components/tabletop/elements/element-light/element-light.component';
import { FigureDialogComponent } from './components/tabletop/figure-dialog/figure-dialog.component';
import { MonsterSetComponent } from './components/tabletop/monster/monster-set.component';
import { AddStandeeDialogComponent } from './components/tabletop/monster/add-standee-dialog/add-standee-dialog.component';
import { MonsterAbilityCardComponent } from './components/tabletop/monster/monster-ability-card/monster-ability-card.component';
import { MonsterAbilityDeckDialogComponent } from './components/tabletop/monster/monster-ability-deck-dialog/monster-ability-deck-dialog.component';
import { MonsterStatCardComponent } from './components/tabletop/monster/monster-stat-card/monster-stat-card.component';
import { MonsterStandeeComponent } from './components/tabletop/monster/standee/monster-standee.component';
import { SetScenarioLevelComponent } from './components/tabletop/set-scenario-level/set-scenario-level.component';
import { TabletopBottomComponent } from './components/tabletop/tabletop-bottom/tabletop-bottom.component';
import { TabletopTopComponent } from './components/tabletop/tabletop-top/tabletop-top.component';
import { TabletopComponent } from './components/tabletop/tabletop.component';
import { TabletopMainComponent } from './components/tabletop/tabletop-main.component';
import { GlidePositionDirective } from './directives/glide-position.directive';
import { NgLetDirective } from './directives/ng-let.directive';
import { MaxHitPointsPipe } from './pipes/max-hit-points.pipe';
import { ModifierPipe } from './pipes/modifier.pipe';
import { CatalogService } from 'services/catalog.service';
import { PersistenceService } from 'services/persistence.service';
import { TabletopService } from 'services/tabletop.service';
import { SharedModule } from 'shared/shared.module';
import { APP_REDUCERS, getReducers } from 'store/app.reducers';
import { P2pEffects } from 'store/p2p/p2p.effects';
import { MonsterAbilityDecksEffects } from 'store/tabletop/monster-ability-decks/monster-ability-decks.effects';
import { TimeMachineEffects } from 'store/time-machine/time-machine.effects';
import { timeMachineMetaReducers } from 'store/time-machine/time-machine.meta-reducers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterIconComponent } from './components/tabletop/character-icon/character-icon.component';
import { CharacterLevelDialogComponent } from './components/tabletop/character-level-dialog/character-level-dialog.component';
import { BossStatCardComponent } from './components/tabletop/monster/boss-stat-card/boss-stat-card.component';

@NgModule({
  declarations: [
    AddCardDialogComponent,
    AddStandeeDialogComponent,
    AppComponent,
    CharacterComponent,
    CharacterInitiativeDialogComponent,
    ConditionComponent,
    ConditionToggleComponent,
    EffectComponent,
    ElementIceComponent,
    ElementAirComponent,
    ElementDarkComponent,
    ElementEarthComponent,
    ElementFireComponent,
    ElementLightComponent,
    FigureDialogComponent,
    MonsterAbilityCardComponent,
    MonsterAbilityDeckDialogComponent,
    MonsterSetComponent,
    MonsterStandeeComponent,
    MonsterStatCardComponent,
    SetScenarioLevelComponent,
    TabletopComponent,
    TabletopBottomComponent,
    TabletopMainComponent,
    TabletopTopComponent,

    GlidePositionDirective,
    NgLetDirective,

    MaxHitPointsPipe,
    ModifierPipe,
    CharacterIconComponent,
    CharacterLevelDialogComponent,
    BossStatCardComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    EffectsModule.forRoot([MonsterAbilityDecksEffects, P2pEffects, TimeMachineEffects]),
    HttpClientModule,
    LayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    SharedModule,
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
