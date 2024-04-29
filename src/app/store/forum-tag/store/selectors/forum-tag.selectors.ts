import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromForumTag from '../reducers/forum-tag.reducers';

import { 
  ForumTagModel 
} from 'src/app/models';

export const getForumTagState = createFeatureSelector<fromForumTag.ForumTagState>(
    fromForumTag.forumTagFeatureKey
);

export const getManyForumTag = createSelector(getForumTagState, (state) => {
  return state.itens;
});