import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromForumTag from '../store/reducers/forum-tag.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ForumTagEffects } from '../store/effects/forum-tag.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromForumTag.forumTagFeatureKey, fromForumTag.forumTagReducer),
    EffectsModule.forFeature([ForumTagEffects])
  ]
})
export class ForumTagStoreModule { }
