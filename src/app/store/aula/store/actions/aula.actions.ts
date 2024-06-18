import { createAction, props } from '@ngrx/store';

import { 
  AulaFilterModel,
  AulaModel, 
  AulaTagModel
} from 'src/app/models';

export const selecionarOneAulaById = createAction(
  '[Aula] selecionarOneAulaById',
  props<{ aulaId: number }>()
);

export const selecionarOneAulaByIdSuccess = createAction(
  '[Aula] selecionarOneAulaById Success',
  props<{ aulaId: number, response: AulaModel }>()
);

export const selecionarOneAulaByIdFailure = createAction(
  '[Aula] selecionarOneAulaById Failure',
  props<{ error: any }>()
);

export const selecionarManyAula = createAction(
  '[Aula] selecionarManyAula'
);

export const selecionarManyAulaSuccess = createAction(
  '[Aula] selecionarManyAula Success',
  props<{ response: AulaModel[] }>()
);

export const selecionarManyAulaFailure = createAction(
  '[Aula] selecionarManyAula Failure',
  props<{ error: any }>()
);

export const selecionarAulaByProfessorId = createAction(
  '[Aula] selecionarAulaByProfessorId',
  props<{ professorId: number }>()
);

export const selecionarAulaByProfessorIdSuccess = createAction(
  '[Aula] selecionarAulaByProfessorId Success',
  props<{ response: AulaModel[] }>()
);

export const selecionarAulaByProfessorIdFailure = createAction(
  '[Aula] selecionarAulaByProfessorId Failure',
  props<{ error: any }>()
);

export const selecionarManyAulaByProfessorId = createAction(
  '[Aula] selecionarManyAulaByProfessorId',
  props<{ professorId: number }>()
);

export const selecionarManyAulaByProfessorIdSuccess = createAction(
  '[Aula] selecionarManyAulaByProfessorId Success',
  props<{ response: AulaModel[] }>()
);

export const selecionarManyAulaByProfessorIdFailure = createAction(
  '[Aula] selecionarManyAulaByProfessorId Failure',
  props<{ error: any }>()
);

export const selecionarManyAulaByAreaFisicaId = createAction(
  '[Aula] selecionarManyAulaByAreaFisicaId',
  props<{ areaFisicaId: number }>()
);

export const selecionarManyAulaByAreaFisicaIdSuccess = createAction(
  '[Aula] selecionarManyAulaByAreaFisicaId Success',
  props<{ response: AulaModel[] }>()
);

export const selecionarManyAulaByAreaFisicaIdFailure = createAction(
  '[Aula] selecionarManyAulaByAreaFisicaId Failure',
  props<{ error: any }>()
);

export const inserirAula = createAction(
  '[Aula] inserirAula',
  props<{ aula: AulaModel }>()
);

export const inserirAulaSuccess = createAction(
  '[Aula] inserirAula Success',
  props<{ aula: AulaModel, response: AulaModel }>()
);

export const inserirAulaFailure = createAction(
  '[Aula] inserirAula Failure',
  props<{ error: any }>()
);

export const atualizarAula = createAction(
  '[Aula] atualizarAula',
  props<{ aula: AulaModel }>()
);

export const atualizarAulaSuccess = createAction(
  '[Aula] atualizarAula Success',
  props<{ aula: AulaModel, response: AulaModel }>()
);

export const atualizarAulaFailure = createAction(
  '[Aula] atualizarAula Failure',
  props<{ error: any }>()
);

export const atualizarAulaCurtir = createAction(
  '[Aula] atualizarAulaCurtir',
  props<{ aula: AulaModel }>()
);

export const atualizarAulaCurtirSuccess = createAction(
  '[Aula] atualizarAulaCurtir Success',
  props<{ aula: AulaModel, response: AulaModel }>()
);

export const atualizarAulaCurtirFailure = createAction(
  '[Aula] atualizarAulaCurtir Failure',
  props<{ error: any }>()
);

export const atualizarAulaFavoritada = createAction(
  '[Aula] atualizarAulaFavoritada',
  props<{ aula: AulaModel }>()
);

export const atualizarAulaFavoritadaSuccess = createAction(
  '[Aula] atualizarAulaFavoritada Success',
  props<{ response: AulaModel }>()
);

export const atualizarAulaFavoritadaFailure = createAction(
  '[Aula] atualizarAulaFavoritada Failure',
  props<{ error: any }>()
);

export const atualizarAulaPosterior = createAction(
  '[Aula] atualizarAulaPosterior',
  props<{ aula: AulaModel }>()
);

export const atualizarAulaPosteriorSuccess = createAction(
  '[Aula] atualizarAulaPosterior Success',
  props<{ response: AulaModel }>()
);

export const atualizarAulaPosteriorFailure = createAction(
  '[Aula] atualizarAulaPosterior Failure',
  props<{ error: any }>()
);

export const atualizarAulaAnterior = createAction(
  '[Aula] atualizarAulaAnterior',
  props<{ aula: AulaModel }>()
);

export const atualizarAulaAnteriorSuccess = createAction(
  '[Aula] atualizarAulaAnterior Success',
  props<{ response: AulaModel }>()
);

export const atualizarAulaAnteriorFailure = createAction(
  '[Aula] atualizarAulaAnterior Failure',
  props<{ error: any }>()
);

export const excluirAula = createAction(
  '[Aula] excluirAula',
  props<{ aulaId: number }>()
);

export const excluirAulaSuccess = createAction(
  '[Aula] excluirAula Success',
  props<{ aulaId: number }>()
);

export const excluirAulaFailure = createAction(
  '[Aula] excluirAula Failure',
  props<{ error: any }>()
);

export const filtrarAula = createAction(
  '[Aula] filtrarAula',
  props<{ aulaFilter: AulaFilterModel }>()
);

export const atualizarAulaPublicado = createAction(
  '[Aula] atualizarAulaPublicado',
  props<{ aula: AulaModel }>()
);

export const atualizarAulaPublicadoSuccess = createAction(
  '[Aula] atualizarAulaPublicado Success',
  props<{ aula: AulaModel, response: AulaModel }>()
);

export const atualizarAulaPublicadoFailure = createAction(
  '[Aula] atualizarAulaPublicado Failure',
  props<{ error: any }>()
);


export const inserirManyAulaTag = createAction(
  '[AulaTag] inserirManyAulaTag',
  props<{ aulaTagMany: AulaTagModel[] }>()
);

export const inserirManyAulaTagSuccess = createAction(
  '[AulaTag] inserirManyAulaTag Success',
  props<{ response: AulaTagModel[] }>()
);

export const inserirManyAulaTagFailure = createAction(
  '[AulaTag] inserirManyAulaTag Failure',
  props<{ error: any }>()
);

export const excluirAulaTag = createAction(
  '[AulaTag] excluirAulaTag',
  props<{ aulaId: number, aulaTagId: number }>()
);

export const excluirAulaTagSuccess = createAction(
  '[AulaTag] excluirAulaTag Success',
  props<{ aulaId: number, aulaTagId: number }>()
);

export const excluirAulaTagFailure = createAction(
  '[AulaTag] excluirAulaTag Failure',
  props<{ error: any }>()
);



export const atualizarAdicaoAulaCurtido = createAction(
  '[AulaCurtido] atualizarAdicaoAulaCurtido',
  props<{ aulaId: number }>()
);

export const atualizarRemocaoAulaCurtido = createAction(
  '[AulaCurtido] atualizarRemocaoAulaCurtido',
  props<{ aulaId: number }>()
);



export const atualizarAdicaoAulaFavoritada = createAction(
  '[AulaFavoritada] atualizarAdicaoAulaFavoritada',
  props<{ aulaId: number }>()
);

export const atualizarRemocaoAulaFavoritada = createAction(
  '[AulaFavoritada] atualizarRemocaoAulaFavoritada',
  props<{ aulaId: number }>()
);



export const atualizarAulaSelected = createAction(
  '[Aula] atualizarAulaSelected',
  props<{ aulaId: number }>()
);