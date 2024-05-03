import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromForumTopicoReplica from '../store/reducers/forum-topico-replica.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ForumTopicoReplicaEffects } from '../store/effects/forum-topico-replica.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromForumTopicoReplica.forumTopicoReplicaFeatureKey, fromForumTopicoReplica.forumTopicoReplicaReducer),
    EffectsModule.forFeature([ForumTopicoReplicaEffects])
  ]
})
export class ForumTopicoReplicaStoreModule { }
