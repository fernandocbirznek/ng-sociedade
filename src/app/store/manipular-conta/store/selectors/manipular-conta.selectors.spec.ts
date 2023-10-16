import * as fromManipularConta from '../reducers/manipular-conta.reducer';
import { selectManipularContaState } from './manipular-conta.selectors';

describe('ManipularConta Selectors', () => {
  it('should select the feature state', () => {
    const result = selectManipularContaState({
      [fromManipularConta.manipularContaFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
