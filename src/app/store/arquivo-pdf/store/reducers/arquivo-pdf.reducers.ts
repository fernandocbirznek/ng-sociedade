import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/arquivo-pdf.actions';

import { 
  ArquivoPdfModel 
} from '../../../../models';

export const arquivoPdfFeatureKey = 'arquivo-pdf';

export interface ArquivoPdfState {
  itens: ArquivoPdfModel[];

  isSuccess: boolean;
  isLoading: boolean;
  isFailure: boolean;
  mensagem: string;
}

export const arquivoPdfInitialState: ArquivoPdfState = {
  itens: [],

  isSuccess: false,
  isLoading: false,
  isFailure: false,
  mensagem: "",
};

export const arquivoPdfReducer = createReducer(
  arquivoPdfInitialState,

  on(actions.selecionarManyArquivoPdfByAulaId, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.selecionarManyArquivoPdfByAulaIdSuccess, (state, action) => {
    let itens = [...action.response].map(item => {

      const byteArray = new Uint8Array(
        atob(item.conteudo)
          .split("")
          .map(char => char.charCodeAt(0)));

      let arquivoPDfModel = ArquivoPdfModel.create({
        ...item,
        conteudo: new Blob([byteArray], { type: 'application/pdf' })
      });

      return arquivoPDfModel
    })
  
   return { 
     ...state, 
     itens: itens,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.selecionarManyArquivoPdfByAulaIdFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao inserir o arquivo"
    };
  }),

  on(actions.inserirArquivoPdf, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.inserirArquivoPdfSuccess, (state, action) => {

    const byteArray = new Uint8Array(
      atob(action.response.conteudo)
        .split("")
        .map(char => char.charCodeAt(0)));
    
    let item: ArquivoPdfModel = ArquivoPdfModel.create({
      aulaId: action.arquivoPdfCommand.aulaSessao!.aulaId,
      contentType: action.response.contentType,
      conteudo: new Blob([byteArray], { type: 'application/pdf' }),
      dataCadastro: action.response.dataCadastro,
      id: action.response.id,
      nome: action.arquivoPdfCommand.nome
    });

    let itens = [...state.itens, item];
  
   return { 
     ...state, 
     itens: itens,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.inserirArquivoPdfFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao inserir o arquivo"
    };
  }),
);
