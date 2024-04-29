import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromForumTopicoResposta from '../store/reducers/forum-topico-resposta.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ForumTopicoRespostaEffects } from '../store/effects/forum-topico-resposta.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromForumTopicoResposta.forumTopicoRespostaFeatureKey, fromForumTopicoResposta.forumTopicoRespostaReducer),
    EffectsModule.forFeature([ForumTopicoRespostaEffects])
  ]
})
export class ForumTopicoRespostaStoreModule { }
