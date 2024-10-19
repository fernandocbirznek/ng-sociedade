import { createAction, props } from '@ngrx/store';

import { 
  HeaderRotaModel 
} from '../../../../models';

export const alterarTituloPagina = createAction(
  '[Header] AlterarTituloPagina',
  props<{ titulo: string, areaFisicaId: number }>()
);

export const adicionarRota = createAction(
  '[Header] AdicionarRota',
  props<{ rota: HeaderRotaModel }>()
);

export const removerRota = createAction(
  '[Header] RemoverRota',
  props<{ rota: HeaderRotaModel }>()
);