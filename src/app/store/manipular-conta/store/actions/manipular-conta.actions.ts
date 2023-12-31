import { createAction, props } from '@ngrx/store';

import { 
  CriarContaPerfilModel, 
  DeletarConta, 
  Login,
  UsuarioModel
} from 'src/app/models';

export const criarConta = createAction(
  '[CriarConta] CriarConta',
  props<{ conta: CriarContaPerfilModel }>()
);

export const criarContaSuccess = createAction(
    '[CriarConta] CriarConta Success',
    props<{ conta: CriarContaPerfilModel, response: any }>()
);

export const criarContaFailure = createAction(
    '[CriarConta] CriarConta Failure',
    props<{ error: any }>()
);

export const loginConta = createAction(
  '[Login] LoginConta',
  props<{ login: Login }>()
);

export const loginContaSuccess = createAction(
    '[Login] LoginConta Success',
    props<{ login: Login, response: UsuarioModel }>()
);

export const loginContaFailure = createAction(
    '[Login] LoginConta Failure',
    props<{ response: any }>()
);

export const deletarConta = createAction(
  '[DeletarConta] DeletarConta',
  props<{ email: DeletarConta }>()
);

export const deletarContaSuccess = createAction(
    '[DeletarConta] DeletarConta Success',
    props<{ response: any }>()
);

export const deletarContaFailure = createAction(
    '[DeletarConta] DeletarConta Failure',
    props<{ response: any }>()
);

export const deslogarConta = createAction(
  '[DeslogarConta] DeslogarConta',
);