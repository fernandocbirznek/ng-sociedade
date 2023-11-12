import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromAula from '../store/reducers/aula.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AulaEffects } from '../store/effects/aula.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAula.aulaFeatureKey, fromAula.aulaReducer),
    EffectsModule.forFeature([AulaEffects])
  ]
})
export class AulaStoreModule { }
