import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsuario from '../reducers/usuario.reducers';

import { 
  TabelaModel,
  TipoUsuarioEnum, 
  UsuarioModel
} from '../../../../models';

import { 
  UsuarioStoreHelper 
} from '../../helpers/usuario-store-helper';

import { 
  UsuarioViewModel 
} from '../../../../models/usuario/usuario-view-model';

import moment from 'moment';

export const getUsuarioState = createFeatureSelector<fromUsuario.UsuarioState>(
  fromUsuario.usuarioFeatureKey
);

export const getUsuarioMany = createSelector(
  getUsuarioState, (
    state
  ): UsuarioModel[] => {

    return state.itens;
  }
)

export const getUsuarioById = (usuarioId: number) => createSelector(
  getUsuarioMany, (
    itens: UsuarioModel[]
  ) => {
    let item = itens
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

export const getManyTabelaUsuarioByTipoUsuario = (
  tipoUsuario: TipoUsuarioEnum
) => createSelector(
  getManyUsuarioByTipoUsuario(tipoUsuario), (
    usuarioMany: UsuarioModel[]
  ): TabelaModel => {

    let itens = usuarioMany.map(item => UsuarioViewModel.create({
      ...item,
      dataCadastroString: moment(item.dataCadastro).format('DD/MM/YYYY')
    }));

    let tabela: TabelaModel = UsuarioStoreHelper.getAdministradorTabelaUsuario();
    
    tabela.dataSource.data = itens;

    return tabela;
  }
)