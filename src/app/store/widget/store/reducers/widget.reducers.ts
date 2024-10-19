import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/widget.actions';

import { 
    WidgetModel
} from '../../../../models';

export const widgetFeatureKey = 'widget';

export interface WidgetState {
    widgetCursar: WidgetModel[];
    widgetConcluido: WidgetModel[];
    widgetCursando: WidgetModel[];
    isSuccess: boolean;
    isLoading: boolean;
    isFailure: boolean;
    error: string
}

export const widgetInitialState: WidgetState = {
    widgetCursar: [],
    widgetConcluido: [],
    widgetCursando: [],
    isSuccess: false,
    isLoading: false,
    isFailure: false,
    error: ""
};

export const widgetReducer = createReducer(
    widgetInitialState,

  on(actions.selecionarWidgetCursarByUsuarioId, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" 
    };
  }),
  on(actions.selecionarWidgetCursarByUsuarioIdSuccess, (state, action) => {
    let itens = action.widgetCursarMany;

    return { 
        ...state, 
        widgetCursar: itens,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false,
        error: ""
    };
  }),
  on(actions.selecionarWidgetCursarByUsuarioIdFailure, (state) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        mensagem: "Falha em buscar aulas para cursar" 
    };
  }),

  on(actions.selecionarWidgetCursandoByUsuarioId, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" 
    };
  }),
  on(actions.selecionarWidgetCursandoByUsuarioIdSuccess, (state, action) => {
    let itens = action.widgetCursandoMany;

    return { 
        ...state, 
        widgetCursando: itens,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false,
        error: ""
    };
  }),
  on(actions.selecionarWidgetCursandoByUsuarioIdFailure, (state) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        mensagem: "Falha em buscar aulas cursado" 
    };
  }),

  on(actions.selecionarWidgetConcluidoByUsuarioId, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" 
    };
  }),
  on(actions.selecionarWidgetConcluidoByUsuarioIdSuccess, (state, action) => {
    let itens = action.widgetConcluidoMany;

    return { 
        ...state, 
        widgetConcluido: itens,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false,
        error: ""
    };
  }),
  on(actions.selecionarWidgetConcluidoByUsuarioIdFailure, (state) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        mensagem: "Falha em buscar aulas concluidas" 
    };
  }),

  on(actions.inserirWidgetConcluido, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" 
    };
  }),
  on(actions.inserirWidgetConcluidoSuccess, (state, action) => {
    let item: WidgetModel = new WidgetModel();
    item.aula = action.widgetConcluido.aula;
    item.id = action.response.id;
    item.dataCadastro = action.response.dataCadastro;

    let widgetConcluidoMany = [...state.widgetConcluido];
    widgetConcluidoMany.push(item);

    return { 
        ...state, 
        widgetConcluido: widgetConcluidoMany,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false,
        error: ""
    };
  }),
  on(actions.inserirWidgetConcluidoFailure, (state) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        mensagem: "Falha ao adicionar aula em concluido" 
    };
  }),

  on(actions.inserirWidgetCursando, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" 
    };
  }),
  on(actions.inserirWidgetCursandoSuccess, (state, action) => {
    let item: WidgetModel = new WidgetModel();
    item.aula = action.widgetCursando.aula;
    item.id = action.response.id;
    item.dataCadastro = action.response.dataCadastro;

    let widgetCursandoMany = [...state.widgetCursando];
    widgetCursandoMany.push(item);

    return { 
        ...state, 
        widgetCursando: widgetCursandoMany,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false,
        error: ""
    };
  }),
  on(actions.inserirWidgetCursandoFailure, (state) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        mensagem: "Falha ao adicionar aula em cursando" 
    };
  }),

  on(actions.inserirWidgetCursar, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" 
    };
  }),
  on(actions.inserirWidgetCursarSuccess, (state, action) => {
    let item: WidgetModel = new WidgetModel();
    item.aula = action.widgetCursar.aula;
    item.id = action.response.id;
    item.dataCadastro = action.response.dataCadastro;

    let widgetCursarMany = [...state.widgetCursar];
    widgetCursarMany.push(item);

    return { 
        ...state, 
        widgetCursar: widgetCursarMany,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false,
        error: ""
    };
  }),
  on(actions.inserirWidgetCursarFailure, (state) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        mensagem: "Falha ao adicionar aula em cursar" 
    };
  }),

  
  on(actions.removerWidgetConcluido, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" 
    };
  }),
  on(actions.removerWidgetConcluidoSuccess, (state, action) => {
    let widgetConcluidoMany = state.widgetConcluido.filter(item => item.aula?.id != action.response);

    return { 
      ...state, 
      widgetConcluido: widgetConcluidoMany,
      isLoading: false, 
      isSuccess: true, 
      isFailure: false,
      error: ""
    };
  }),
  on(actions.removerWidgetConcluidoFailure, (state) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        mensagem: "Falha ao remover aula em concluido" 
    };
  }),

  on(actions.removerWidgetCursando, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" 
    };
  }),
  on(actions.removerWidgetCursandoSuccess, (state, action) => {
    let widgetCursandoMany = state.widgetCursando.filter(item => item.aula?.id != action.response);

    return { 
        ...state, 
        widgetCursando: widgetCursandoMany,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false,
        error: ""
    };
  }),
  on(actions.removerWidgetCursandoFailure, (state) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        mensagem: "Falha ao remover aula em cursando" 
    };
  }),

  on(actions.removerWidgetCursar, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" 
    };
  }),
  on(actions.removerWidgetCursarSuccess, (state, action) => {
    let widgetCursarMany = state.widgetCursar.filter(item => item.aula?.id != action.response);

    return { 
        ...state, 
        widgetCursar: widgetCursarMany,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false,
        error: ""
    };
  }),
  on(actions.removerWidgetCursarFailure, (state) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        mensagem: "Falha ao remover aula em cursar" 
    };
  }),
);
