import { createAction, props } from '@ngrx/store';

import { 
    NoticiaFilterModel,
    NoticiaModel, 
    NoticiaRequestModel
} from '../../../../models';

export const selecionarNoticiaManyHome = createAction(
    '[Noticia] selecionarNoticiaManyHome'
);

export const selecionarNoticiaManyHomeSuccess = createAction(
    '[Noticia] selecionarNoticiaManyHome Success',
    props<{ response: NoticiaModel[] }>()
);

export const selecionarNoticiaManyHomeFailure = createAction(
    '[Noticia] selecionarNoticiaManyHome Failure',
    props<{ error: any }>()
);

export const selecionarManyNoticia = createAction(
    '[Noticia] selecionarManyNoticia'
);

export const selecionarManyNoticiaSuccess = createAction(
    '[Noticia] selecionarManyNoticia Success',
    props<{ response: NoticiaModel[] }>()
);

export const selecionarManyNoticiaFailure = createAction(
    '[Noticia] selecionarManyNoticia Failure',
    props<{ error: any }>()
);

export const selecionarNoticiaManyByProfessorId = createAction(
    '[Noticia] selecionarNoticiaManyByProfessorId',
    props<{ professorId: number }>()
);

export const selecionarNoticiaManyByProfessorIdSuccess = createAction(
    '[Noticia] selecionarNoticiaManyByProfessorId Success',
    props<{ response: NoticiaModel[] }>()
);

export const selecionarNoticiaManyByProfessorIdFailure = createAction(
    '[Noticia] selecionarNoticiaManyByProfessorId Failure',
    props<{ error: any }>()
);

export const inserirNoticia = createAction(
    '[Noticia] inserirNoticia',
    props<{ noticia: NoticiaRequestModel }>()
);

export const inserirNoticiaSuccess = createAction(
    '[Noticia] inserirNoticia Success',
    props<{ request: NoticiaRequestModel, response: NoticiaModel }>()
);

export const inserirNoticiaFailure = createAction(
    '[Noticia] inserirNoticia Failure',
    props<{ error: any }>()
);

export const atualizarNoticia = createAction(
    '[Noticia] atualizarNoticia',
    props<{ noticia: NoticiaRequestModel }>()
);

export const atualizarNoticiaSuccess = createAction(
    '[Noticia] atualizarNoticia Success',
    props<{ request: NoticiaRequestModel, response: NoticiaModel }>()
);

export const atualizarNoticiaFailure = createAction(
    '[Noticia] atualizarNoticia Failure',
    props<{ error: any }>()
);

export const excluirNoticia = createAction(
    '[Noticia] excluirNoticia',
    props<{ noticiaId: NoticiaModel }>()
);

export const excluirNoticiaSuccess = createAction(
    '[Noticia] excluirNoticia Success',
    props<{ response: NoticiaModel }>()
);

export const excluirNoticiaFailure = createAction(
    '[Noticia] excluirNoticia Failure',
    props<{ error: any }>()
);

export const selecionarManyAreaInteresseByNoticiaId = createAction(
    '[AreaInteresse] selecionarManyAreaInteresseByNoticiaById',
    props<{ noticiaId: number }>()
);

export const selecionarManyAreaInteresseByNoticiaIdSuccess = createAction(
    '[AreaInteresse] selecionarManyAreaInteresseByNoticiaById Success',
    props<{ noticiaId: number, response: any[] }>()
);

export const selecionarManyAreaInteresseByNoticiaIdFailure = createAction(
    '[AreaInteresse] selecionarManyAreaInteresseByNoticiaById Failure',
    props<{ error: any }>()
);

export const filtrarNoticia = createAction(
    '[Noticia] selecionarNoticiaManyHome',
    props<{ noticiaFilter: NoticiaFilterModel }>()
);

export const atualizarAdicaoNoticiaFavoritado = createAction(
    '[Noticia] atualizarAdicaoNoticiaFavoritado',
    props<{ noticiaId: number }>()
);

export const atualizarRemocaoNoticiaFavoritado = createAction(
    '[Noticia] atualizarRemocaoNoticiaFavoritado',
    props<{ noticiaId: number }>()
);