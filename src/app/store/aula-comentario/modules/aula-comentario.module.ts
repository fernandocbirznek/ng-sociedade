import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromAulaComentario from '../store/reducers/aula-comentario.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AulaComentarioEffects } from '../store/effects/aula-comentario.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAulaComentario.aulaComentarioFeatureKey, fromAulaComentario.aulaComentarioReducer),
    EffectsModule.forFeature([AulaComentarioEffects])
  ]
})
export class AulaComentarioStoreModule { }
