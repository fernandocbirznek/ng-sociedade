import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAreaFisica from '../reducers/area-fisica.reducers';

import * as headerFeature from '../../../header/store';

import { 
  AreaFisicaModel, 
  TabelaModel
} from '../../../../models';
import { AreaFisicaStoreHelpers } from '../../helpers/area-fisica-helper';
import { AreaFisicaViewModel } from '../../../../models/area-fisica/area-fisica-view.model';
import moment from 'moment';

export const selectAreaFisicaState = createFeatureSelector<fromAreaFisica.AreaFisicaState>(
    fromAreaFisica.areaFisicaFeatureKey
);

export const getManyAreaFisica = createSelector(
  selectAreaFisicaState, (
    state
  ): AreaFisicaViewModel[] => {

    let itens = state.areaFisica.map(
      item => AreaFisicaViewModel.create({
        ...item,
        dataCadastroString: moment(item.dataCadastro).format('DD/MM/YYYY')
      })
    );

  return itens.sort((a: AreaFisicaModel, b: AreaFisicaModel) => {
    if (a.titulo < b.titulo) {
      return -1;
    }
    if (a.titulo > b.titulo) {
      return 1;
    }
    return 0;
  });
})

export const getOneAreaFisicaByAreaFisicaId = createSelector(
  getManyAreaFisica,
  headerFeature.getAreaFisicaId, (
    itens: AreaFisicaViewModel[],
    areaFisicaId: number
  ): AreaFisicaViewModel | undefined => {
    
    return itens.find(item => item.id == areaFisicaId);
  }
)

export const getManyAreaFisicaAdministradorTabela = createSelector(
  getManyAreaFisica,
  headerFeature.getAreaFisicaId, (
    itens: AreaFisicaViewModel[]
  ): TabelaModel => {
    
    let tabela: TabelaModel = AreaFisicaStoreHelpers.getAdministradorTabelaAreaFisica();

    tabela.dataSource.data = itens;

    return tabela;
  }
)