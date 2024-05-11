import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromHeader from '../store/reducers/header.reducers';
import { EffectsModule } from '@ngrx/effects';
//import { HeaderEffects } from '../store/effects/header.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromHeader.headerFeatureKey, fromHeader.headerReducer),
    //EffectsModule.forFeature([NoticiaEffects])
  ]
})
export class HeaderStoreModule { }
