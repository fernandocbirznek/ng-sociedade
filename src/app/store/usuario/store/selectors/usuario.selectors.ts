import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsuario from '../reducers/usuario.reducers';

import { 
  AreaInteresseModel,
  TipoUsuarioEnum 
} from 'src/app/models';

import * as areaInteresseFeature from '../../../area-interesse/store';

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

export const getManyUsuarioByTipoUsuario = (tipoUsuario: TipoUsuarioEnum) => createSelector(
  getUsuarioState, (
    state,
  ) => {

    let itens = 
      state
      .itens
      .filter(item => item.tipoUsuarioEnum == tipoUsuario);

    if (tipoUsuario == TipoUsuarioEnum.UsuarioProfessor) {
      let professorAdministrador = state
        .itens.filter(item => item.tipoUsuarioEnum == TipoUsuarioEnum.UsuarioProfessorAdministrador);

      itens = itens.concat(professorAdministrador);
    }

    return itens;
  }
)