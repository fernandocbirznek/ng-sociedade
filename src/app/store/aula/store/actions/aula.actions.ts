import { createAction, props } from '@ngrx/store';

import { 
  AulaModel 
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
