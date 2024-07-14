import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/aula.actions';

import { 
  AulaFilterModel,
  AulaViewModel
} from 'src/app/models';


export const aulaFeatureKey = 'aula';

export interface AulaState {
  aulas: AulaViewModel[];
  aulaFilter: AulaFilterModel;
  aulaSelected: number;

  isSuccess: boolean;
  isLoading: boolean;
  isFailure: boolean;
  mensagem: string;
}

export const aulaInitialState: AulaState = {
  aulas: [],
  aulaFilter: new AulaFilterModel,
  aulaSelected: 0,

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

  on(actions.selecionarManyAula, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.selecionarManyAulaSuccess, (state, action) => {
   let aulas = action.response;

   return { 
     ...state, 
     aulas: aulas,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.selecionarManyAulaFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao buscar as aulas do sistema"
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
   let aulas: AulaViewModel[] = action.response;
  
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
    let item: AulaViewModel = {...action.aula};
    item.id = action.response.id;
    item.dataCadastro = action.response.dataCadastro;

    let itens = [...state.aulas, item];

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
        let aula = new AulaViewModel();
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
      if(item.id == action.aula.id) {
        let aula: AulaViewModel = {...item};
        aula.curtido = action.aula.curtido;
        aula.dataAtualizacao = action.response.dataAtualizacao;

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

  on(actions.atualizarAulaPosterior, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.atualizarAulaPosteriorSuccess, (state, action) => {
    let aulas = [...state.aulas].map(item => {
      if(item.id == action.response.id) {
        let aula = new AulaViewModel();
        aula.areaFisicaId = item.areaFisicaId;
        aula.curtido = item.curtido;
        aula.favoritado = item.favoritado;
        aula.id = item.id;
        aula.professorId = item.professorId;
        aula.resumo = item.resumo;
        aula.titulo = item.titulo;
        aula.areaFisicaTitulo = item.areaFisicaTitulo;
        aula.aulaComentarioMany = item.aulaComentarioMany;
        aula.aulaSessaoMany = item.aulaSessaoMany;
        aula.aulaTagMany = item.aulaTagMany;
        aula.aulaPosteriorId = action.response.aulaPosteriorId;
        aula.aulaAnteriorId = item.aulaAnteriorId;
        aula.comentario = item.comentario;
        aula.dataCadastro = item.dataCadastro;
        aula.dataAtualizacao = action.response.dataAtualizacao;
        aula.publicado = item.publicado;

        aula.usuarioNome = item.usuarioNome;
        aula.usuarioFoto = item.usuarioFoto;

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
  on(actions.atualizarAulaPosteriorFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao atualizar aula posterior." 
    };
  }),

  on(actions.atualizarAulaAnterior, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.atualizarAulaAnteriorSuccess, (state, action) => {
    let aulas = [...state.aulas].map(item => {
      if(item.id == action.response.id) {
        let aula = new AulaViewModel();
        aula.areaFisicaId = item.areaFisicaId;
        aula.curtido = item.curtido;
        aula.favoritado = item.favoritado;
        aula.id = item.id;
        aula.professorId = item.professorId;
        aula.resumo = item.resumo;
        aula.titulo = item.titulo;
        aula.areaFisicaTitulo = item.areaFisicaTitulo;
        aula.aulaComentarioMany = item.aulaComentarioMany;
        aula.aulaSessaoMany = item.aulaSessaoMany;
        aula.aulaTagMany = item.aulaTagMany;
        aula.aulaPosteriorId = item.aulaPosteriorId;
        aula.aulaAnteriorId = action.response.aulaAnteriorId;
        aula.comentario = item.comentario;
        aula.dataCadastro = item.dataCadastro;
        aula.dataAtualizacao = action.response.dataAtualizacao;
        aula.publicado = item.publicado;

        aula.usuarioNome = item.usuarioNome;
        aula.usuarioFoto = item.usuarioFoto;

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
  on(actions.atualizarAulaAnteriorFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao atualizar aula anterior." 
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

  on(actions.atualizarAulaPublicado, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.atualizarAulaPublicadoSuccess, (state, action) => {
    let itens = [...state.aulas].map(item => {
        if(item.id == action.aula.id) {
          let aula = new AulaViewModel();
          aula.areaFisicaId = item.areaFisicaId;
          aula.curtido = item.curtido;
          aula.favoritado = item.favoritado;
          aula.id = item.id;
          aula.professorId = item.professorId;
          aula.resumo = item.resumo;
          aula.titulo = item.titulo;
          aula.areaFisicaTitulo = item.areaFisicaTitulo;
          aula.aulaComentarioMany = item.aulaComentarioMany;
          aula.aulaSessaoMany = item.aulaSessaoMany;
          aula.aulaTagMany = item.aulaTagMany;
          aula.comentario = item.comentario;
          aula.dataCadastro = item.dataCadastro;
          aula.dataAtualizacao = item.dataCadastro;
          aula.publicado = action.aula.publicado;

          aula.usuarioNome = item.usuarioNome;
        aula.usuarioFoto = item.usuarioFoto;

          return aula;
        }
        return item;
    });
    
    return { 
        ...state, 
        aulas: itens,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false, 
        error: ""
    };
  }),
  on(actions.atualizarAulaPublicadoFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao alterar publicação aula"
    };
  }),
  
  on(actions.filtrarAula, (state, action) => {
    return { 
        ...state,
        aulaFilter: action.aulaFilter,
    };
  }),


  on(actions.inserirManyAulaTag, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.inserirManyAulaTagSuccess, (state, action) => {
    let itens = [...state.aulas].map(item => {
      if (item.id == action.response[0].id) {
        let aula = new AulaViewModel();
        aula.areaFisicaId = item.areaFisicaId;
        aula.curtido = item.curtido;
        aula.favoritado = item.favoritado;
        aula.id = item.id;
        aula.professorId = item.professorId;
        aula.resumo = item.resumo;
        aula.titulo = item.titulo;
        aula.areaFisicaTitulo = item.areaFisicaTitulo;
        aula.aulaComentarioMany = item.aulaComentarioMany;
        aula.aulaSessaoMany = item.aulaSessaoMany;
        aula.aulaTagMany = action.response;
        aula.comentario = item.comentario;
        aula.dataCadastro = item.dataCadastro;
        aula.dataAtualizacao = action.response[0].dataCadastro;
        
        aula.usuarioNome = item.usuarioNome;
        aula.usuarioFoto = item.usuarioFoto;

        return aula;
      }
      return item;
    });

    return {
      ...state,
      aulas: itens,
      isLoading: false,
      isSuccess: true,
      isFailure: false,
    };
  }),
  on(actions.inserirManyAulaTagFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao inserir tag na aula." 
    };
  }),

  on(actions.excluirAulaTag, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.excluirAulaTagSuccess, (state, action) => {
    let itens = [...state.aulas].map(item => {
      if (item.id == action.aulaId) {
        let aulaTagMany = [...item.aulaTagMany].filter(aulaTag => aulaTag.id != action.aulaTagId);

        let aula = new AulaViewModel();
        aula.areaFisicaId = item.areaFisicaId;
        aula.curtido = item.curtido;
        aula.favoritado = item.favoritado;
        aula.id = item.id;
        aula.professorId = item.professorId;
        aula.resumo = item.resumo;
        aula.titulo = item.titulo;
        aula.areaFisicaTitulo = item.areaFisicaTitulo;
        aula.aulaComentarioMany = item.aulaComentarioMany;
        aula.aulaSessaoMany = item.aulaSessaoMany;
        aula.aulaTagMany = aulaTagMany;
        aula.comentario = item.comentario;
        aula.dataCadastro = item.dataCadastro;
        aula.dataAtualizacao = item.dataCadastro;
        
        aula.usuarioNome = item.usuarioNome;
        aula.usuarioFoto = item.usuarioFoto;

        return aula;
      }
      return item;
    });
  
   return { 
     ...state, 
     aulas: itens,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.excluirAulaTagFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao excluir aula"
    };
  }),


  on(actions.atualizarAdicaoAulaCurtido, (state, action) => {
    let itens = [...state.aulas].map(item => {
        if(item.id == action.aulaId) {
          let aula = new AulaViewModel();
          aula.areaFisicaId = item.areaFisicaId;
          aula.curtido = item.curtido + 1;
          aula.favoritado = item.favoritado;
          aula.id = item.id;
          aula.professorId = item.professorId;
          aula.resumo = item.resumo;
          aula.titulo = item.titulo;
          aula.areaFisicaTitulo = item.areaFisicaTitulo;
          aula.aulaComentarioMany = item.aulaComentarioMany;
          aula.aulaSessaoMany = item.aulaSessaoMany;
          aula.aulaTagMany = item.aulaTagMany;
          aula.comentario = item.comentario;
          aula.dataCadastro = item.dataCadastro;
          aula.dataAtualizacao = item.dataCadastro;
          
          aula.usuarioNome = item.usuarioNome;
        aula.usuarioFoto = item.usuarioFoto;

          return aula;
        }
        return item;
    });
    
    return { 
        ...state, 
        aulas: itens,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false, 
        error: ""
    };
  }),
  on(actions.atualizarRemocaoAulaCurtido, (state, action) => {
    let itens = [...state.aulas].map(item => {
        if(item.id == action.aulaId) {
          let aula = new AulaViewModel();
          aula.areaFisicaId = item.areaFisicaId;
          aula.curtido = item.curtido -1;
          aula.favoritado = item.favoritado;
          aula.id = item.id;
          aula.professorId = item.professorId;
          aula.resumo = item.resumo;
          aula.titulo = item.titulo;
          aula.areaFisicaTitulo = item.areaFisicaTitulo;
          aula.aulaComentarioMany = item.aulaComentarioMany;
          aula.aulaSessaoMany = item.aulaSessaoMany;
          aula.aulaTagMany = item.aulaTagMany;
          aula.comentario = item.comentario;
          aula.dataAtualizacao = item.dataCadastro;
          
          aula.usuarioNome = item.usuarioNome;
        aula.usuarioFoto = item.usuarioFoto;

          return aula;
        }
        return item;
    });
    
    return { 
        ...state, 
        aulas: itens,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false, 
        error: ""
    };
  }),



  on(actions.atualizarAdicaoAulaFavoritada, (state, action) => {
    let itens = [...state.aulas].map(item => {
        if(item.id == action.aulaId) {
          let aula = new AulaViewModel();
          aula.areaFisicaId = item.areaFisicaId;
          aula.curtido = item.curtido;
          aula.favoritado = item.favoritado + 1;
          aula.id = item.id;
          aula.professorId = item.professorId;
          aula.resumo = item.resumo;
          aula.titulo = item.titulo;
          aula.areaFisicaTitulo = item.areaFisicaTitulo;
          aula.aulaComentarioMany = item.aulaComentarioMany;
          aula.aulaSessaoMany = item.aulaSessaoMany;
          aula.aulaTagMany = item.aulaTagMany;
          aula.comentario = item.comentario;
          aula.dataCadastro = item.dataCadastro;
          aula.dataAtualizacao = item.dataCadastro;
          
          aula.usuarioNome = item.usuarioNome;
        aula.usuarioFoto = item.usuarioFoto;

          return aula;
        }
        return item;
    });
    
    return { 
        ...state, 
        aulas: itens,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false, 
        error: ""
    };
  }),
  on(actions.atualizarRemocaoAulaFavoritada, (state, action) => {
    let itens = [...state.aulas].map(item => {
        if(item.id == action.aulaId) {
          let aula = new AulaViewModel();
          aula.areaFisicaId = item.areaFisicaId;
          aula.curtido = item.curtido;
          aula.favoritado = item.favoritado - 1;
          aula.id = item.id;
          aula.professorId = item.professorId;
          aula.resumo = item.resumo;
          aula.titulo = item.titulo;
          aula.areaFisicaTitulo = item.areaFisicaTitulo;
          aula.aulaComentarioMany = item.aulaComentarioMany;
          aula.aulaSessaoMany = item.aulaSessaoMany;
          aula.aulaTagMany = item.aulaTagMany;
          aula.comentario = item.comentario;
          aula.dataCadastro = item.dataCadastro;
          aula.dataAtualizacao = item.dataCadastro;
          
          aula.usuarioNome = item.usuarioNome;
          aula.usuarioFoto = item.usuarioFoto;

          return aula;
        }
        return item;
    });
    
    return { 
        ...state, 
        aulas: itens,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false, 
        error: ""
    };
  }),

  on(actions.atualizarAulaSelected, (state, action) => {
    
    return { 
        ...state, 
        aulaSelected: action.aulaId,
    };
  }),
);
