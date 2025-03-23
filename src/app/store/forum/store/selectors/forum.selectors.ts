import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromForum from '../reducers/forum.reducers';

import { 
  ForumModel, 
  ForumViewModel, 
  TabelaModel
} from '../../../../models';
import moment from 'moment';
import { ForumStoreHelper } from '../../helpers/forum-store-helper';

export const getForumState = createFeatureSelector<fromForum.ForumState>(
    fromForum.forumFeatureKey
);

export const getManyForum = createSelector(getForumState, (state) => {
  return state.itens;
});

export const getOneForumByForumId = (forumId: number) => createSelector(
  getForumState, (
    state
  ): ForumModel | undefined => {

    return state.itens.find(item => item.id == forumId);
  }
)

export const getTabelaForum = createSelector(
  getManyForum, (
    forumMany: ForumModel[]
  ): TabelaModel => {

    let itens = forumMany.map(forum => ForumViewModel.create({
      ...forum,
      dataCadastroString: moment(forum.dataCadastro).format('DD/MM/YYYY')
    }));

    let tabela: TabelaModel = ForumStoreHelper.getTabelaForum();
    
    tabela.dataSource.data = itens;

    return tabela;
  }
)