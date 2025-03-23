import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAreaInteresse from '../reducers/area-interesse.reducers';

import { 
  AreaInteresseModel, 
  AreaInteresseViewModel,
  TabelaModel
} from '../../../../models';

import moment from 'moment';
import { AreaInteresseStoreHelper } from '../../helpers/area-interesse-store-helper';

export const selectAreaInteresseState = createFeatureSelector<fromAreaInteresse.AreaInteresseState>(
    fromAreaInteresse.areaInteresseFeatureKey
);

export const getManyAreaInteresse = createSelector(selectAreaInteresseState, (state) => {
  return state.itens;
})

export const getTabelaAreaInteresse= createSelector(
  getManyAreaInteresse, (
    AreaInteresseMany: AreaInteresseModel[]
  ): TabelaModel => {

    let itens = AreaInteresseMany.map(areaInteresse => AreaInteresseViewModel.create({
      ...areaInteresse,
      dataCadastroString: moment(areaInteresse.dataCadastro).format('DD/MM/YYYY')
    }));

    let tabela: TabelaModel = AreaInteresseStoreHelper.getTabelaAreaInteresse();
    
    tabela.dataSource.data = itens;

    return tabela;
  }
)