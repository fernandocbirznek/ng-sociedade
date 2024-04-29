import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromForum from '../store/reducers/forum.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ForumEffects } from '../store/effects/forum.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromForum.forumFeatureKey, fromForum.forumReducer),
    EffectsModule.forFeature([ForumEffects])
  ]
})
export class ForumStoreModule { }
