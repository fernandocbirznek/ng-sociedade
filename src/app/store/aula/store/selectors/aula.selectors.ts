import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAula from '../reducers/aula.reducers';

import { 
  AreaFisicaModel,
  AulaModel 
} from 'src/app/models';

import * as areaFisicaFeature from '../../../area-fisica/store';

export const selectAulaState = createFeatureSelector<fromAula.AulaState>(
  fromAula.aulaFeatureKey
);

export const getAulas = createSelector(selectAulaState, (state) => {
  return state.aulas;
})

export const getManyAulaByProfessorId = (professorId: number) => createSelector(
  selectAulaState,
  areaFisicaFeature.getManyAreaFisica, (
    state,
    areaFisicaMany: AreaFisicaModel[]
  ) => {
  let itens: AulaModel[] = 
    state
      .aulas
      .filter(item => item.professorId == professorId)
      .map(item => {
        let areaFisica = areaFisicaMany.find(areaFisica => areaFisica.id == item.areaFisicaId);
        let aulaModel = {...item};
        if (areaFisica)
          aulaModel.areaFisicaDescricao = areaFisica.descricao;
        aulaModel.comentario = item.aulaComentarioMany.length;
        return aulaModel;
      });

    return itens;
  }
)

export const getOneAulaById = (aulaId: number) => createSelector(
  selectAulaState, 
  areaFisicaFeature.getManyAreaFisica, (
    state,
    areaFisicaMany: AreaFisicaModel[]
  ) => {
    let item = new AulaModel;
    let aula = state.aulas.find(item => item.id == aulaId);
    let areaFisica: AreaFisicaModel | undefined = undefined;

    if (aula)
      areaFisica = areaFisicaMany.find(areaFisica => areaFisica.id == aula!.id)
    if (aula && areaFisica) {
      item = {...aula};
      item.areaFisicaDescricao = areaFisica.descricao;
    }

    return item;
  }
)