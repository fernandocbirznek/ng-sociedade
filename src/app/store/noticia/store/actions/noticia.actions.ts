import { createAction, props } from '@ngrx/store';

import { 
    NoticiaModel, 
    NoticiaRequestModel
} from 'src/app/models';

export const selecionarManyNoticiaHome = createAction(
    '[Noticia] SelecionarNoticia'
);

export const selecionarManyNoticiaHomeSuccess = createAction(
    '[Noticia] SelecionarNoticia Success',
    props<{ response: NoticiaModel[] }>()
);

export const selecionarManyNoticiaHomeFailure = createAction(
    '[Noticia] SelecionarNoticia Failure',
    props<{ error: any }>()
);

export const selecionarOneNoticiaById = createAction(
    '[Noticia] selecionarOneNoticiaById',
    props<{ noticiaId: number }>()
);

export const selecionarOneNoticiaByIdSuccess = createAction(
    '[Noticia] selecionarOneNoticiaById Success',
    props<{ response: NoticiaModel }>()
);

export const selecionarOneNoticiaByIdFailure = createAction(
    '[Noticia] selecionarOneNoticiaById Failure',
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
    props<{ noticia: NoticiaModel }>()
);

export const atualizarNoticiaSuccess = createAction(
    '[Noticia] atualizarNoticia Success',
    props<{ request: NoticiaModel, response: NoticiaModel }>()
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