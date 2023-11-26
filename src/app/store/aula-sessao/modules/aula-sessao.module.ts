import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromAulaSessao from '../store/reducers/aula-sessao.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AulaSessaoEffects } from '../store/effects/aula-sessao.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAulaSessao.aulaSessaoFeatureKey, fromAulaSessao.aulaSessaoReducer),
    EffectsModule.forFeature([AulaSessaoEffects])
  ]
})
export class AulaSessaoStoreModule { }