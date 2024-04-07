import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromUsuarioAulaSessaoFavoritado from '../store/reducers/usuario-aula-sessao-favoritado.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UsuarioAulaSessaoFavoritadoEffects } from '../store/effects/usuario-aula-sessao-favoritado.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
        fromUsuarioAulaSessaoFavoritado.usuarioAulaSessaoFavoritadoFeatureKey, 
        fromUsuarioAulaSessaoFavoritado.usuarioAulaSessaoFavoritadoReducer),
    EffectsModule.forFeature([UsuarioAulaSessaoFavoritadoEffects])
  ]
})
export class UsuarioAulaSessaoFavoritadoModule { }
