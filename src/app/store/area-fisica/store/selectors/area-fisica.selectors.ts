import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAreaFisica from '../reducers/area-fisica.reducers';
import { AreaFisicaModel } from 'src/app/models';

import * as headerFeature from '../../../header/store';

export const selectAreaFisicaState = createFeatureSelector<fromAreaFisica.AreaFisicaState>(
    fromAreaFisica.areaFisicaFeatureKey
);

export const getManyAreaFisica = createSelector(
  selectAreaFisicaState, (
    state
  ): AreaFisicaModel[] => {
  let itens = [...state.areaFisica].sort((a: AreaFisicaModel, b: AreaFisicaModel) => {
    if (a.titulo < b.titulo) {
      return -1;
    }
    if (a.titulo > b.titulo) {
      return 1;
    }
    return 0;
  });
  return itens;
})

export const getOneAreaFisicaByAreaFisicaId = createSelector(
  getManyAreaFisica,
  headerFeature.getAreaFisicaId, (
    itens: AreaFisicaModel[],
    areaFisicaId: number
  ): AreaFisicaModel | undefined => {
    
    return itens.find(item => item.id == areaFisicaId);
  }
)