import { createAction, props } from '@ngrx/store';

export const alterarTituloPagina = createAction(
  '[Header] AlterarTituloPagina',
  props<{ titulo: string, areaFisicaId: number }>()
);
