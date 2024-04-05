import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromWidget from '../reducers/widget.reducers';
import { WidgetModel, WidgetViewModel } from 'src/app/models';

export const getWidgetState = createFeatureSelector<fromWidget.WidgetState>(
  fromWidget.widgetFeatureKey
);

export const getManyAulaCursarByUsuarioById = createSelector(
  getWidgetState, (
  state
  ) => {

    return state.widgetCursar;
  }
)

export const getManyAulaCursandoByUsuarioById = createSelector(
  getWidgetState, (
  state
  ) => {

    return state.widgetCursando;
  }
)

export const getManyAulaConcluidoByUsuarioById = createSelector(
  getWidgetState, (
  state
  ) => {

    return state.widgetConcluido;
  }
)

export const getWidgetMany = createSelector( 
  getManyAulaCursarByUsuarioById,
  getManyAulaCursandoByUsuarioById, 
  getManyAulaConcluidoByUsuarioById, (
  widgetCursarMany: WidgetModel[],
  widgetCursandoMany: WidgetModel[],
  widgetConcluidoMany: WidgetModel[],
  ) => {
    let widgetMany : WidgetViewModel = new WidgetViewModel();
    widgetMany.widgetConcluido = widgetConcluidoMany;
    widgetMany.widgetCursando = widgetCursandoMany;
    widgetMany.widgetCursar = widgetCursarMany;
    
    return widgetMany;
  }
)