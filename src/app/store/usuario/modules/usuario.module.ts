import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromUsuario from '../store/reducers/usuario.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UsuarioEffects } from '../store/effects/usuario.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromUsuario.usuarioFeatureKey, fromUsuario.usuarioReducer),
    EffectsModule.forFeature([UsuarioEffects])
  ]
})
export class UsuarioModule { }
