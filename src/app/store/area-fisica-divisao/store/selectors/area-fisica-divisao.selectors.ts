import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAreaFisicaDivisao from '../reducers/area-fisica-divisao.reducers';

import { 
    AreaFisicaDivisaoModel 
} from 'src/app/models';

import * as headerFeature from '../../../header/store';

export const selectAreaFisicaDivisaoState = createFeatureSelector<fromAreaFisicaDivisao.AreaFisicaDivisaoState>(
    fromAreaFisicaDivisao.areaFisicaDivisaoFeatureKey
);

export const getManyAreaFisicaDivisao = createSelector(selectAreaFisicaDivisaoState, (state) => {
  return state.itens;
})

export const getManyAreaFisicaDivisaoByAreaFisicaId = createSelector(
    getManyAreaFisicaDivisao,
    headerFeature.getAreaFisicaId, (
    itens: AreaFisicaDivisaoModel[],
    areaFisicaId: number
  ): AreaFisicaDivisaoModel[] => {
    
    return itens.filter(item => item.areaFisicaId == areaFisicaId);
  }
)