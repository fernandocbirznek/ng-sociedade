import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromWidget from '../reducers/widget.reducers';

import { 
  InformacaoWidgetAlunoViewModel, 
  WidgetModel, 
  WidgetViewModel 
} from '../../../../models';

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
    return WidgetViewModel.create({
      widgetConcluido: widgetConcluidoMany,
      widgetCursando: widgetCursandoMany,
      widgetCursar: widgetCursarMany
    });
  }
)

export const getOneInformacaoAlunoWidget = createSelector( 
  getManyAulaCursarByUsuarioById,
  getManyAulaCursandoByUsuarioById, 
  getManyAulaConcluidoByUsuarioById, (
  widgetCursarMany: WidgetModel[],
  widgetCursandoMany: WidgetModel[],
  widgetConcluidoMany: WidgetModel[],
  ):InformacaoWidgetAlunoViewModel => {
    let informacaoAulaAluno : InformacaoWidgetAlunoViewModel = InformacaoWidgetAlunoViewModel.create({
      aulaConcluidoMany: widgetConcluidoMany.length,
      aulaCursandoMany: widgetCursandoMany.length,
      aulaParaCursarMany: widgetCursarMany.length
    });
    
    return informacaoAulaAluno;
  }
)