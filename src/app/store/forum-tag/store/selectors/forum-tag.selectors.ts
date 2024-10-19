import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromForumTag from '../reducers/forum-tag.reducers';

export const getForumTagState = createFeatureSelector<fromForumTag.ForumTagState>(
    fromForumTag.forumTagFeatureKey
);

export const getManyForumTag = createSelector(getForumTagState, (state) => {
  return state.itens;
});