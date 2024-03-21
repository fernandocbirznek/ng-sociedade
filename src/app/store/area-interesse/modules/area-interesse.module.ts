import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromAreaInteresse from '../store/reducers/area-interesse.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AreaInteresseEffects } from '../store/effects/area-interesse.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAreaInteresse.areaInteresseFeatureKey, fromAreaInteresse.areaInteresseReducer),
    EffectsModule.forFeature([AreaInteresseEffects])
  ]
})
export class AreaInteresseStoreModule { }
