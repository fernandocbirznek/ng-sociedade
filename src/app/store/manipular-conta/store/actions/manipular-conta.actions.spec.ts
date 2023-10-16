import * as fromManipularConta from './manipular-conta.actions';

describe('loadManipularContas', () => {
  it('should return an action', () => {
    expect(fromManipularConta.loadManipularContas().type).toBe('[ManipularConta] Load ManipularContas');
  });
});
