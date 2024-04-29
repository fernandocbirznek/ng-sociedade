import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromForumTopico from '../reducers/forum-topico.reducers';

import { 
  ForumTopicoModel 
} from 'src/app/models';

export const getForumTopicoState = createFeatureSelector<fromForumTopico.ForumTopicoState>(
    fromForumTopico.forumTopicoFeatureKey
);

export const getManyForumTopico = createSelector(getForumTopicoState, (state) => {
  
  return state.itens;
})

export const getOneForumTopicoById = (forumTopicoId: number) => createSelector(
  getManyForumTopico, (
    itens: ForumTopicoModel[]
  ): ForumTopicoModel | undefined => {

    return itens.find(item => item.id == forumTopicoId);
  }
)