import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/noticia.actions';
import { AreaInteresseModel, NoticiaModel } from 'src/app/models';

export const noticiaFeatureKey = 'noticia';

export interface NoticiaState {
    itens: NoticiaModel[];
    isSuccess: boolean;
    isLoading: boolean;
    isFailure: boolean;
    error: string
}

export const noticiaInitialState: NoticiaState = {
    itens: [],
    isSuccess: false,
    isLoading: false,
    isFailure: false,
    error: ""
};

export const noticiaReducer = createReducer(
  noticiaInitialState,

  on(actions.selecionarNoticiaManyHome, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" 
    };
  }),
  on(actions.selecionarNoticiaManyHomeSuccess, (state, action) => {
    let itens = [...state.itens];
    
    action.response.forEach(noticia => {
      if(!state.itens.find(item => item.id == noticia.id))
        itens.push(noticia);
    })

    return { 
        ...state, 
        itens: itens,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false,
        error: ""
    };
  }),
  on(actions.selecionarNoticiaManyHomeFailure, (state) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        mensagem: "Falha em buscar noticias da home" 
    };
  }),

  on(actions.selecionarNoticiaManyByProfessorId, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" 
    };
  }),
  on(actions.selecionarNoticiaManyByProfessorIdSuccess, (state, action) => {
    let itens = [...state.itens];
    
    action.response.forEach(noticia => {
      if(!state.itens.find(item => item.id == noticia.id))
        itens.push(noticia);
    })

    return { 
      ...state, 
      itens: itens,
      isLoading: false, 
      isSuccess: true, 
      isFailure: false,
      error: ""
    };
  }),
  on(actions.selecionarNoticiaManyByProfessorIdFailure, (state) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        mensagem: "Falha em buscar noticias da home" 
    };
  }),

  on(actions.inserirNoticia, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" };
  }),
  on(actions.inserirNoticiaSuccess, (state, action) => {
    let itens = [...state.itens, action.response];
    
    return { 
        ...state, 
        itens: itens,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false, 
        error: ""
    };
  }),
  on(actions.inserirNoticiaFailure, (state, action) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        error: "Falha ao inserir noticia"};
  }),

  on(actions.atualizarNoticia, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" };
  }),
  on(actions.atualizarNoticiaSuccess, (state, action) => {
    let itens = [...state.itens].map(item => {
        if(item.id == action.request.id) {
          let noticia: NoticiaModel = new NoticiaModel();
          noticia.id = item.id;
          noticia.dataCadastro = item.dataCadastro;
          noticia.titulo = action.request.titulo;
          noticia.resumo = action.request.resumo;
          noticia.conteudo = action.request.conteudo;
          noticia.usuarioCadastroId = item.usuarioCadastroId;
          noticia.dataAtualizacao = action.response.dataAtualizacao;
          noticia.areaInteresseMany = action.response.areaInteresseMany;
          return noticia;
        }
        return item;
    });
    
    return { 
        ...state, 
        itens: itens,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false, 
        error: ""
    };
  }),
  on(actions.atualizarNoticiaFailure, (state, action) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        error: "Falha ao atualizar noticia"};
  }),

  on(actions.excluirNoticia, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" };
  }),
  on(actions.excluirNoticiaSuccess, (state, action) => {
    let itens = [...state.itens].filter(item => item.id != action.response.id);
    
    return { 
        ...state, 
        itens: itens,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false, 
        error: ""
    };
  }),
  on(actions.excluirNoticiaFailure, (state, action) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        error: "Falha ao excluir noticia"};
  }),

  on(actions.selecionarManyAreaInteresseByNoticiaId, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" 
    };
  }),
  on(actions.selecionarManyAreaInteresseByNoticiaIdSuccess, (state, action) => {
    let areaInteresses = action.response.map(item => {
      let areaInteresse = new AreaInteresseModel();
      areaInteresse.nome = item.areaInteresse ? item.areaInteresse.nome : "";
      return areaInteresse;
    })
  
    let itens = [...state.itens].map(item => {
      if(item.id == action.noticiaId) {
        let noticia = new NoticiaModel();
        noticia.dataAtualizacao = item.dataAtualizacao,
        noticia.dataCadastro = item.dataCadastro,
        noticia.conteudo = item.conteudo,
        noticia.id = item.id;
        noticia.usuarioCadastroNome = item.usuarioCadastroNome;
        noticia.resumo = item.resumo;
        noticia.titulo = item.titulo;
        noticia.usuarioCadastroId = item.usuarioCadastroId;
        noticia.areaInteresseMany = areaInteresses;
        return noticia;
      }
      return item;
    });
  
    return { 
        ...state, 
        itens: itens,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false,
        error: ""
    };
  }),
  on(actions.selecionarManyAreaInteresseByNoticiaIdFailure, (state) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        mensagem: "Falha em buscar as tags das notícias" 
    };
  }),
);
