import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/aula.actions';

import { 
  AulaModel 
} from 'src/app/models';


export const aulaFeatureKey = 'aula';

export interface AulaState {
  aulas: AulaModel[];
  isSuccess: boolean;
  isLoading: boolean;
  isFailure: boolean;
  mensagem: string;
}

export const aulaInitialState: AulaState = {
  aulas: [],
  isSuccess: false,
  isLoading: false,
  isFailure: false,
  mensagem: "",
};

export const aulaReducer = createReducer(
  aulaInitialState,

  on(actions.selecionarOneAulaById, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.selecionarOneAulaByIdSuccess, (state, action) => {
   let aulas = [...state.aulas];

   if(!aulas.find(item => item.id == action.aulaId))
    aulas.push(action.response);
  
   return { 
     ...state, 
     aulas: aulas,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.selecionarOneAulaByIdFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao buscar as aula por id"
    };
  }),

  on(actions.selecionarAulaByProfessorId, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.selecionarAulaByProfessorIdSuccess, (state, action) => {
   let aulas: AulaModel[] = action.response;
  
   return { 
     ...state, 
     aulas: aulas,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.selecionarAulaByProfessorIdFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao buscar as aulas do professor"
    };
  }),

  on(actions.selecionarManyAulaByAreaFisicaId, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.selecionarManyAulaByAreaFisicaIdSuccess, (state, action) => {
   let aulas = [...state.aulas];

   action.response.forEach(aula => {
    if(!state.aulas.find(item => item.id == aula.id))
      aulas.push(aula);
  })
  
   return { 
     ...state, 
     aulas: aulas,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.selecionarManyAulaByAreaFisicaIdFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao buscar as aulas da área da física"
    };
  }),

  on(actions.selecionarManyAulaByProfessorId, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.selecionarManyAulaByProfessorIdSuccess, (state, action) => {
   let aulas = [...state.aulas];

   action.response.forEach(aula => {
    if(!state.aulas.find(item => item.id == aula.id))
      aulas.push(aula);
  })
  
   return { 
     ...state, 
     aulas: aulas,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.selecionarManyAulaByProfessorIdFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao buscar as aulas do professor"
    };
  }),

  on(actions.inserirAula, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.inserirAulaSuccess, (state, action) => {
    let itens = [...state.aulas, action.aula];

    return {
      ...state,
      aulas: itens,
      isLoading: false,
      isSuccess: true,
      isFailure: false,
    };
  }),
  on(actions.inserirAulaFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao cadastrar Aula." 
    };
  }),

  on(actions.atualizarAula, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.atualizarAulaSuccess, (state, action) => {
    let aulas = [...state.aulas].map(item => {
      if(item.id == action.aula.id) {
        let aula = new AulaModel();
        aula.areaFisicaId = action.aula.areaFisicaId;
        aula.curtido = action.aula.curtido;
        aula.favoritado = action.aula.favoritado;
        aula.id = action.aula.id;
        aula.professorId = action.aula.professorId;
        aula.resumo = action.aula.resumo;
        aula.titulo = action.aula.titulo;
        return aula;
      }
      return item;
    });

    return {
      ...state,
      aulas: aulas,
      isLoading: false,
      isSuccess: true,
      isFailure: false,
    };
  }),
  on(actions.atualizarAulaFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao atualizar Aula." 
    };
  }),

  on(actions.atualizarAulaCurtir, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.atualizarAulaCurtirSuccess, (state, action) => {
    let aulas = [...state.aulas].map(item => {
      if(item.id == action.response.id) {
        return action.response;
      }
      return item;
    });

    return {
      ...state,
      aulas: aulas,
      isLoading: false,
      isSuccess: true,
      isFailure: false,
    };
  }),
  on(actions.atualizarAulaCurtirFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao atualizar curtir Aula." 
    };
  }),

  on(actions.atualizarAulaFavoritada, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.atualizarAulaFavoritadaSuccess, (state, action) => {
    let aulas = [...state.aulas].map(item => {
      if(item.id == action.response.id) {
        return action.response;
      }
      return item;
    });

    return {
      ...state,
      aulas: aulas,
      isLoading: false,
      isSuccess: true,
      isFailure: false,
    };
  }),
  on(actions.atualizarAulaFavoritadaFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao atualizar favoritar Aula." 
    };
  }),

  on(actions.excluirAula, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.excluirAulaSuccess, (state, action) => {
   let aulas = state.aulas.filter(item => item.id != action.aulaId);
  
   return { 
     ...state, 
     aulas: aulas,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.excluirAulaFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao excluir aula"
    };
  }),
);
