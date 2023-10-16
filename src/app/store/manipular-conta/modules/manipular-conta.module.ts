import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromManipularConta from '../store/reducers/manipular-conta.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ManipularContaEffects } from '../store/effects/manipular-conta.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromManipularConta.manipularContaFeatureKey, fromManipularConta.manipularContaReducer),
    EffectsModule.forFeature([ManipularContaEffects])
  ]
})
export class ManipularContaModule { }
