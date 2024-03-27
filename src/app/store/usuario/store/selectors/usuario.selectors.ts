import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsuario from '../reducers/usuario.reducers';

import { 
    UsuarioModel 
} from 'src/app/models';

export const getUsuarioState = createFeatureSelector<fromUsuario.UsuarioState>(
  fromUsuario.usuarioFeatureKey
);

export const getUsuarioById = (usuarioId: number) => createSelector(
  getUsuarioState, (
    state
  ) => {
    let item = 
      state
      .itens
      .find(item => item.id == usuarioId)
    
    return item;
  }
)