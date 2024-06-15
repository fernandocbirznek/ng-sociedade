import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromArquivoPdf from '../store/reducers/arquivo-pdf.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ArquivoPdfEffects } from '../store/effects/arquivo-pdf.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromArquivoPdf.arquivoPdfFeatureKey, fromArquivoPdf.arquivoPdfReducer),
    EffectsModule.forFeature([ArquivoPdfEffects])
  ]
})
export class ArquivoPdfStoreModule { }
