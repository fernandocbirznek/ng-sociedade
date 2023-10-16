import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ManipularContaEffects } from './manipular-conta.effects';

describe('ManipularContaEffects', () => {
  let actions$: Observable<any>;
  let effects: ManipularContaEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ManipularContaEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ManipularContaEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
