import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/forum-topico-replica.actions';

import { 
    ForumTopicoReplicaModel,
} from 'src/app/models';


export const forumTopicoReplicaFeatureKey = 'forum-topico-replica';

export interface ForumTopicoReplicaState {
    itens: ForumTopicoReplicaModel[];
    isSuccess: boolean;
    isLoading: boolean;
    isFailure: boolean;
    mensagem: string;
}

export const forumTopicoReplicaInitialState: ForumTopicoReplicaState = {
    itens: [],
    isSuccess: false,
    isLoading: false,
    isFailure: false,
    mensagem: "",
};

export const forumTopicoReplicaReducer = createReducer(
  forumTopicoReplicaInitialState,

  on(actions.selecionarManyForumTopicoReplicaByForumTopicoId, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.selecionarManyForumTopicoReplicaByForumTopicoIdSuccess, (state, action) => {
  
   return { 
     ...state, 
     itens: action.response,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.selecionarManyForumTopicoReplicaByForumTopicoIdFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao buscar as replicas do fórum tópico"
    };
  }),

  on(actions.inserirForumTopicoReplica, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.inserirForumTopicoReplicaSuccess, (state, action) => {

   return { 
     ...state, 
     itens: [...state.itens, action.response],
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.inserirForumTopicoReplicaFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao inserir a replica no fórum tópico"
    };
  }),

  on(actions.atualizarForumTopicoReplica, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.atualizarForumTopicoReplicaSuccess, (state, action) => {
    let itens = [...state.itens].map(item => {
        if (item.id == action.forumTopicoReplica.id) {
            let forumTopicoReplica: ForumTopicoReplicaModel = new ForumTopicoReplicaModel();
            forumTopicoReplica.dataCadastro = action.forumTopicoReplica.dataCadastro;
            forumTopicoReplica.descricao = action.forumTopicoReplica.descricao;
            forumTopicoReplica.forumTopicoId = action.forumTopicoReplica.forumTopicoId;
            forumTopicoReplica.forumTopicoRespostaId = action.forumTopicoReplica.forumTopicoRespostaId;
            forumTopicoReplica.id = action.forumTopicoReplica.id;
            forumTopicoReplica.usuarioId = action.forumTopicoReplica.usuarioId;
            forumTopicoReplica.dataAtualizacao = action.response.dataAtualizacao;

            return forumTopicoReplica;
        }
        return item;
    })

   return { 
     ...state, 
     itens: itens,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.atualizarForumTopicoReplicaFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao atualizar a replica no fórum tópico"
    };
  }),

  on(actions.excluirForumTopicoReplica, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.excluirForumTopicoReplicaSuccess, (state, action) => {
    let itens = [...state.itens].filter(item => item.id != action.response);

   return { 
     ...state, 
     itens: itens,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.excluirForumTopicoReplicaFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao excluir a replica no fórum tópico"
    };
  }),
);