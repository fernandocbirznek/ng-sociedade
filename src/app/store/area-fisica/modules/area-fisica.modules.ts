import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromAreaFisica from '../store/reducers/area-fisica.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AreaFisicaEffects } from '../store/effects/area-fisica.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAreaFisica.areaFisicaFeatureKey, fromAreaFisica.areaFisicaReducer),
    EffectsModule.forFeature([AreaFisicaEffects])
  ]
})
export class AreaFisicaStoreModule { }
