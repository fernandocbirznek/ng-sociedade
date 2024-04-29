import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromForumTopico from '../store/reducers/forum-topico.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ForumTopicoEffects } from '../store/effects/forum-topico.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromForumTopico.forumTopicoFeatureKey, fromForumTopico.forumTopicoReducer),
    EffectsModule.forFeature([ForumTopicoEffects])
  ]
})
export class ForumTopicoStoreModule { }
