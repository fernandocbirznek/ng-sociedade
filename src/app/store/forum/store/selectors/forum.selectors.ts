import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromForum from '../reducers/forum.reducers';

import { 
  ForumModel 
} from 'src/app/models';

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