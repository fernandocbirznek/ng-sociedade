import { createAction, props } from '@ngrx/store';

import { 
    AreaFisicaDivisaoModel 
} from 'src/app/models';

export const selecionarManyAreaFisicaDivisaoByAreaFisicaId = createAction(
    '[AreaFisicaDivisao] selecionarManyAreaFisicaDivisao',
    props<{ areaFisicaId: number }>()
  );
  
  export const selecionarManyAreaFisicaDivisaoByAreaFisicaIdSuccess = createAction(
    '[AreaFisicaDivisao] selecionarManyAreaFisicaDivisaoByAreaFisicaId Success',
    props<{ areaFisicaId: number, response: AreaFisicaDivisaoModel[] }>()
  );
  
  export const selecionarManyAreaFisicaDivisaoByAreaFisicaIdFailure = createAction(
    '[AreaFisicaDivisao] selecionarManyAreaFisicaDivisaoByAreaFisicaId Failure',
    props<{ error: any }>()
  );
  