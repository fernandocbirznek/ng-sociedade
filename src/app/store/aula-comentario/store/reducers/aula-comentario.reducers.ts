import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/aula-comentario.actions';

import { 
  AulaComentarioModel 
} from 'src/app/models';


export const aulaComentarioFeatureKey = 'aula-comentario';

export interface AulaComentarioState {
  itens: AulaComentarioModel[];
  isSuccess: boolean;
  isLoading: boolean;
  isFailure: boolean;
  mensagem: string;
}

export const aulaComentarioInitialState: AulaComentarioState = {
  itens: [],
  isSuccess: false,
  isLoading: false,
  isFailure: false,
  mensagem: "",
};

export const aulaComentarioReducer = createReducer(
  aulaComentarioInitialState,

  on(actions.selecionarManyAulaComentarioByAulaId, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.selecionarManyAulaComentarioByAulaIdSuccess, (state, action) => {
    let itens = [...state.itens];

    action.response.forEach(aula => {
     if(!state.itens.find(item => item.id == aula.id))
       itens.push(aula);
   })
  
   return { 
     ...state, 
     itens: itens,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.selecionarManyAulaComentarioByAulaIdFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao buscar os comentários da aula"
    };
  }),

  on(actions.inserirAulaComentario, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.inserirAulaComentarioSuccess, (state, action) => {
    let item: AulaComentarioModel = new AulaComentarioModel();
    item.dataCadastro = action.response.dataCadastro;
    item.aulaId = action.aulaComentario.aulaId;
    item.descricao = action.aulaComentario.descricao;
    item.id = action.response.id;
    item.usuarioId = action.aulaComentario.usuarioId;

    let itens = [...state.itens, item];

    return {
      ...state,
      itens: itens,
      isLoading: false,
      isSuccess: true,
      isFailure: false,
    };
  }),
  on(actions.inserirAulaComentarioFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao cadastrar comentário na aula." 
    };
  }),

  on(actions.atualizarAulaComentario, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.atualizarAulaComentarioSuccess, (state, action) => {
    let itens = [...state.itens].map(item => {
      if(item.id == action.aulaComentario.id) {
        let aulaComentario: AulaComentarioModel = new AulaComentarioModel();
        aulaComentario.dataCadastro = action.aulaComentario.dataCadastro;
        aulaComentario.dataAtualizacao = action.response.dataAtualizacao;
        aulaComentario.aulaId = action.aulaComentario.aulaId;
        aulaComentario.descricao = action.aulaComentario.descricao;
        aulaComentario.id = action.response.id;
        aulaComentario.usuarioId = action.aulaComentario.usuarioId;

        return aulaComentario;
      }
      return item;
    });

    return {
      ...state,
      itens: itens,
      isLoading: false,
      isSuccess: true,
      isFailure: false,
    };
  }),
  on(actions.atualizarAulaComentarioFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao atualizar o comnetário da aula" 
    };
  }),

  on(actions.excluirAulaComentario, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.excluirAulaComentarioSuccess, (state, action) => {
   let itens = state.itens.filter(item => item.id != action.response);
  
   return { 
     ...state, 
     itens: itens,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.excluirAulaComentarioFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao excluir o comentário da aula"
    };
  }),
);
