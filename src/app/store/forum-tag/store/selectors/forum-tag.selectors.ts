import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromForumTag from '../reducers/forum-tag.reducers';

import { 
  ForumTagModel, 
  ForumTagViewModel, 
  TabelaModel 
} from '../../../../models';

import moment from 'moment';
import { ForumTagStoreHelper } from '../../helpers/forum-tag-store-helper';

export const getForumTagState = createFeatureSelector<fromForumTag.ForumTagState>(
    fromForumTag.forumTagFeatureKey
);

export const getManyForumTag = createSelector(getForumTagState, (state) => {
  return state.itens;
});

export const getTabelaForumTag = createSelector(
  getManyForumTag, (
    forumTagMany: ForumTagModel[]
  ): TabelaModel => {

    let itens = forumTagMany.map(forumTag => ForumTagViewModel.create({
      ...forumTag,
      dataCadastroString: moment(forumTag.dataCadastro).format('DD/MM/YYYY')
    }));

    let tabela: TabelaModel = ForumTagStoreHelper.getTabelaForumTag();
    
    tabela.dataSource.data = itens;

    return tabela;
  }
)