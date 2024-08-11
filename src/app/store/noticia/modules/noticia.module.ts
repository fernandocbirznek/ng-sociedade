import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromNoticia from '../store/reducers/noticia.reducers';
import { EffectsModule } from '@ngrx/effects';
import { NoticiaEffects } from '../store/effects/noticia.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromNoticia.noticiaFeatureKey, fromNoticia.noticiaReducer),
    EffectsModule.forFeature([NoticiaEffects])
  ]
})
export class NoticiaStoreModule { }
