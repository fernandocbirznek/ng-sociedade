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
    let widgetMany : WidgetViewModel = new WidgetViewModel();
    widgetMany.widgetConcluido = widgetConcluidoMany;
    widgetMany.widgetCursando = widgetCursandoMany;
    widgetMany.widgetCursar = widgetCursarMany;
    
    return widgetMany;
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
    let informacaoAulaAluno : InformacaoWidgetAlunoViewModel = new InformacaoWidgetAlunoViewModel();
    informacaoAulaAluno.aulaConcluidoMany = widgetConcluidoMany.length;
    informacaoAulaAluno.aulaCursandoMany = widgetCursandoMany.length;
    informacaoAulaAluno.aulaParaCursarMany = widgetCursarMany.length;
    
    return informacaoAulaAluno;
  }
)