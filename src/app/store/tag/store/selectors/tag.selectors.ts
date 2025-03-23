import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTag from '../reducers/tag.reducers';

import { 
  TabelaModel,
  TagModel, 
  TagViewModel
} from '../../../../models';
import moment from 'moment';
import { TagStoreHelper } from '../../helpers/tag-store-helper';

export const getTagState = createFeatureSelector<fromTag.TagState>(
    fromTag.tagFeatureKey
);

export const getManyTag = createSelector(getTagState, (state) => {
  
  return state.itens;
})

export const getTabelaTag = createSelector(
  getManyTag, (
    tagMany: TagModel[]
  ): TabelaModel => {

    let itens = tagMany.map(tag => TagViewModel.create({
      ...tag,
      dataCadastroString: moment(tag.dataCadastro).format('DD/MM/YYYY')
    }));

    let tabela: TabelaModel = TagStoreHelper.getTabelaTag();
    
    tabela.dataSource.data = itens;

    return tabela;
  }
)