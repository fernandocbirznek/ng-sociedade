import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromAreaFisicaDivisao from '../store/reducers/area-fisica-divisao.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AreaFisicaDivisaoEffects } from '../store/effects/area-fisica-divisao.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAreaFisicaDivisao.areaFisicaDivisaoFeatureKey, fromAreaFisicaDivisao.areaFisicaDivisaoReducer),
    EffectsModule.forFeature([AreaFisicaDivisaoEffects])
  ]
})
export class AreaFisicaDivisaoStoreModule { }
