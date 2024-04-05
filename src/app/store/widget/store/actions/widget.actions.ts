import { createAction, props } from '@ngrx/store';

import { 
    WidgetModel,
} from 'src/app/models';

export const selecionarWidgetCursarByUsuarioId = createAction(
    '[Widget] selecionarWidgetCursarByUsuarioId',
    props<{ usuarioId: number }>()
);

export const selecionarWidgetCursarByUsuarioIdSuccess = createAction(
    '[Widget] selecionarWidgetCursarByUsuarioId Success',
    props<{ widgetCursarMany: WidgetModel[] }>()
);

export const selecionarWidgetCursarByUsuarioIdFailure = createAction(
    '[Widget] selecionarWidgetCursarByUsuarioId Failure',
    props<{ error: any }>()
);

export const selecionarWidgetCursandoByUsuarioId = createAction(
    '[Widget] selecionarWidgetCursandoByUsuarioId',
    props<{ usuarioId: number }>()
);

export const selecionarWidgetCursandoByUsuarioIdSuccess = createAction(
    '[Widget] selecionarWidgetCursandoByUsuarioId Success',
    props<{ widgetCursandoMany: WidgetModel[] }>()
);

export const selecionarWidgetCursandoByUsuarioIdFailure = createAction(
    '[Widget] selecionarWidgetCursandoByUsuarioId Failure',
    props<{ error: any }>()
);

export const selecionarWidgetConcluidoByUsuarioId = createAction(
    '[Widget] selecionarWidgetConcluidoByUsuarioId',
    props<{ usuarioId: number }>()
);

export const selecionarWidgetConcluidoByUsuarioIdSuccess = createAction(
    '[Widget] selecionarWidgetConcluidoByUsuarioId Success',
    props<{ widgetConcluidoMany: WidgetModel[] }>()
);

export const selecionarWidgetConcluidoByUsuarioIdFailure = createAction(
    '[Widget] selecionarWidgetConcluidoByUsuarioId Failure',
    props<{ error: any }>()
);

export const inserirWidgetConcluido = createAction(
    '[Widget] inserirWidgetConcluido',
    props<{ widgetConcluido: WidgetModel }>()
);

export const inserirWidgetConcluidoSuccess = createAction(
    '[Widget] inserirWidgetConcluido Success',
    props<{ 
        widgetConcluido: WidgetModel,
        response: WidgetModel 
    }>()
);

export const inserirWidgetConcluidoFailure = createAction(
    '[Widget] inserirWidgetConcluido Failure',
    props<{ error: any }>()
);

export const inserirWidgetCursando = createAction(
    '[Widget] inserirWidgetCursando',
    props<{ widgetCursando: WidgetModel }>()
);

export const inserirWidgetCursandoSuccess = createAction(
    '[Widget] inserirWidgetCursando Success',
    props<{ 
        widgetCursando: WidgetModel,
        response: WidgetModel 
    }>()
);

export const inserirWidgetCursandoFailure = createAction(
    '[Widget] inserirWidgetCursando Failure',
    props<{ error: any }>()
);

export const inserirWidgetCursar = createAction(
    '[Widget] inserirWidgetCursar',
    props<{ widgetCursar: WidgetModel }>()
);

export const inserirWidgetCursarSuccess = createAction(
    '[Widget] inserirWidgetCursar Success',
    props<{ 
        widgetCursar: WidgetModel,
        response: WidgetModel 
    }>()
);

export const inserirWidgetCursarFailure = createAction(
    '[Widget] inserirWidgetCursar Failure',
    props<{ error: any }>()
);

export const removerWidgetConcluido = createAction(
    '[Widget] removerWidgetConcluido',
    props<{ widgetConcluidoId: number }>()
);

export const removerWidgetConcluidoSuccess = createAction(
    '[Widget] removerWidgetConcluido Success',
    props<{ response: number }>()
);

export const removerWidgetConcluidoFailure = createAction(
    '[Widget] removerWidgetConcluido Failure',
    props<{ error: any }>()
);

export const removerWidgetCursando = createAction(
    '[Widget] removerWidgetCursando',
    props<{ widgetCursandoId: number }>()
);

export const removerWidgetCursandoSuccess = createAction(
    '[Widget] removerWidgetCursando Success',
    props<{ response: number }>()
);

export const removerWidgetCursandoFailure = createAction(
    '[Widget] removerWidgetCursando Failure',
    props<{ error: any }>()
);

export const removerWidgetCursar = createAction(
    '[Widget] removerWidgetCursar',
    props<{ widgetCursarId: number }>()
);

export const removerWidgetCursarSuccess = createAction(
    '[Widget] removerWidgetCursar Success',
    props<{  response: number }>()
);

export const removerWidgetCursarFailure = createAction(
    '[Widget] removerWidgetCursar Failure',
    props<{ error: any }>()
);