import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/aula-sessao.actions';

import { 
  AulaSessaoModel 
} from '../../../../models';

export const aulaSessaoFeatureKey = 'aula-sessao';

export interface AulaSessaoState {
    aulaSessao: AulaSessaoModel[];
    isSuccess: boolean;
    isLoading: boolean;
    isFailure: boolean;
    mensagem: string;
}

export const aulaSessaoInitialState: AulaSessaoState = {
    aulaSessao: [],
    isSuccess: false,
    isLoading: false,
    isFailure: false,
    mensagem: "",
};

export const aulaSessaoReducer = createReducer(
  aulaSessaoInitialState,

  on(actions.selecionarOneAulaSessaoById, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.selecionarOneAulaSessaoByIdSuccess, (state, action) => {
    let itens = [...state.aulaSessao];

    if(!itens.find(item => item.id == action.aulaSessaoId))
        itens.push(action.response);
  
   return { 
        ...state, 
        aulaSessao: itens,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false, 
   };
  }),
  on(actions.selecionarOneAulaSessaoByIdFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao buscar a sessão da aula por id"
    };
  }),

  on(actions.selecionarManyAulaSessaoByAulaId, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.selecionarManyAulaSessaoByAulaIdSuccess, (state, action) => {
    let itens: AulaSessaoModel[] = action.response;

    itens = itens.map(item => {
      return {
        ...item,
        aulaId: action.aulaId
      }
    })
  
   return { 
     ...state, 
     aulaSessao: itens,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.selecionarManyAulaSessaoByAulaIdFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao buscar as sessões da aula"
    };
  }),

  on(actions.inserirAulaSessao, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.inserirAulaSessaoSuccess, (state, action) => {
    let aulaSessao = AulaSessaoModel.create({
      ...action.aulaSessao,
      id: action.response.id,
      dataCadastro: action.response.dataCadastro
    });

    let itens = [...state.aulaSessao, aulaSessao];

    return {
      ...state,
      aulaSessao: itens,
      isLoading: false,
      isSuccess: true,
      isFailure: false,
    };
  }),
  on(actions.inserirAulaSessaoFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao cadastrar nosa sessão da aula." 
    };
  }),

  on(actions.atualizarAulaSessao, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.atualizarAulaSessaoSuccess, (state, action) => {
    let itens = [...state.aulaSessao].map(item => {
      if(item.id == action.aulaSessao.id) {
        return AulaSessaoModel.create({
          ...action.aulaSessao,
          dataAtualizacao: action.response.dataAtualizacao
        });
      }

      return item;
    });

    return {
      ...state,
      aulaSessao: itens,
      isLoading: false,
      isSuccess: true,
      isFailure: false,
    };
  }),
  on(actions.atualizarAulaSessaoFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao atualizar a sessão da aula." 
    };
  }),

  on(actions.atualizarAulaSessaoFavoritada, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.atualizarAulaSessaoFavoritadaSuccess, (state, action) => {
    let itens = [...state.aulaSessao].map(item => {
      if(item.id == action.response.id) {
        return action.response;
      }
      return item;
    });

    return {
      ...state,
      aulaSessao: itens,
      isLoading: false,
      isSuccess: true,
      isFailure: false,
    };
  }),
  on(actions.atualizarAulaSessaoFavoritadaFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao atualizar favoritar sessão aula." 
    };
  }),

  on(actions.excluirAulaSessao, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.excluirAulaSessaoSuccess, (state, action) => {
   let itens = state.aulaSessao.filter(item => item.id != action.aulaSessaoId);
  
   return { 
     ...state, 
     aulaSessao: itens,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.excluirAulaSessaoFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao excluir a sessão da aula"
    };
  }),
  on(actions.atualizarAulaSessaoOrdem, (state, action) => {
    return { 
      ...state,
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao excluir a sessão da aula"
    };
  }),
  on(actions.atualizarAulaSessaoOrdemSuccess, (state, action) => {
    let itens = 
      state
        .aulaSessao
        .filter(item => 
          action.aulaSessaoOrdemRequest.aulaSessaoMany.some(aulaSessao => aulaSessao.id == item.id)
        )
        .map(item => {
          let aulaSessao = action.aulaSessaoOrdemRequest.aulaSessaoMany.find(aulaSessao => aulaSessao.id == item.id);
          if (aulaSessao) {
            return AulaSessaoModel.create({
              ...item,
              ordem: aulaSessao.ordem
            });
          }

          return item;
        });
   
    return { 
      ...state, 
      aulaSessao: itens,
      isLoading: false, 
      isSuccess: true, 
      isFailure: false, 
    };
   }),
   on(actions.atualizarAulaSessaoOrdemFailure, (state) => {
     return { 
       ...state, 
       isLoading: false, 
       isSuccess: false, 
       isFailure: true, 
       mensagem: "Erro ao excluir a sessão da aula"
     };
   }),
);
