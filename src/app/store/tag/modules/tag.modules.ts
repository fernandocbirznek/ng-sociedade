import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromTag from '../store/reducers/tag.reducers';
import { EffectsModule } from '@ngrx/effects';
import { TagEffects } from '../store/effects/tag.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromTag.tagFeatureKey, fromTag.tagReducer),
    EffectsModule.forFeature([TagEffects])
  ]
})
export class TagStoreModule { }
