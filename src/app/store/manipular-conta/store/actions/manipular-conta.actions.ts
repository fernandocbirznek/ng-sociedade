import { createAction, props } from '@ngrx/store';

import { 
  CriarContaPerfilModel, 
  DeletarConta, 
  Login,
  UsuarioAreaInteresseModel,
  UsuarioModel,
  UsuarioPerfilModel
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

export const atualizarUsuarioPerfil = createAction(
  '[UsuarioPerfil] atualizarUsuarioPerfil',
  props<{ usuarioPerfil: UsuarioPerfilModel }>()
);

export const atualizarUsuarioPerfilSuccess = createAction(
  '[UsuarioPerfil] atualizarUsuarioPerfil Success',
  props<{ 
      usuarioPerfil: UsuarioPerfilModel,
      response: Date 
  }>()
);

export const atualizarUsuarioPerfilFailure = createAction(
  '[UsuarioPerfil] atualizarUsuarioPerfil Failure',
  props<{ error: any }>()
);

export const inserirUsuarioAreaInteresse = createAction(
  '[UsuarioAreaInteresse] inserirUsuarioAreaInteresse',
  props<{ usuarioAreaInteresse: UsuarioAreaInteresseModel }>()
);

export const inserirUsuarioAreaInteresseSuccess = createAction(
  '[UsuarioAreaInteresse] inserirUsuarioAreaInteresse Success',
  props<{ 
      usuarioAreaInteresse: UsuarioAreaInteresseModel,
      response: UsuarioAreaInteresseModel 
  }>()
);

export const inserirUsuarioAreaInteresseFailure = createAction(
  '[UsuarioAreaInteresse] inserirUsuarioAreaInteresse Failure',
  props<{ error: any }>()
);

export const removerUsuarioAreaInteresse = createAction(
  '[UsuarioAreaInteresse] removerUsuarioAreaInteresse',
  props<{ usuarioAreaInteresse: UsuarioAreaInteresseModel }>()
);

export const removerUsuarioAreaInteresseSuccess = createAction(
  '[UsuarioAreaInteresse] removerUsuarioAreaInteresse Success',
  props<{ 
      usuarioAreaInteresse: UsuarioAreaInteresseModel,
      response: UsuarioAreaInteresseModel 
  }>()
);

export const removerUsuarioAreaInteresseFailure = createAction(
  '[UsuarioAreaInteresse] removerUsuarioAreaInteresse Failure',
  props<{ error: any }>()
);