import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromWidget from '../store/reducers/widget.reducers';
import { EffectsModule } from '@ngrx/effects';
import { WidgetEffects } from '../store/effects/widget.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromWidget.widgetFeatureKey, fromWidget.widgetReducer),
    EffectsModule.forFeature([WidgetEffects])
  ]
})
export class WidgetModule { }
