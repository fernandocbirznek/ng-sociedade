import { createAction, props } from '@ngrx/store';

import { 
  AdministradorHomeAulaInformacaoModel,
  CriarContaPerfilModel, 
  DeletarConta, 
  Login,
  UsuarioAreaInteresseModel,
  UsuarioAulaCurtidoModel,
  UsuarioAulaFavoritadaModel,
  UsuarioModel,
  UsuarioNoticiaFavoritadoModel,
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

export const loginAutomaticoWhitToken = createAction(
  '[LoginAutomatico] loginAutomaticoWhitToken',
  props<{ token: string }>()
);

export const loginAutomaticoWhitTokenSuccess = createAction(
  '[LoginAutomatico] loginAutomaticoWhitToken Success',
  props<{ response: UsuarioModel }>()
);

export const loginAutomaticoWhitTokenFailure = createAction(
  '[LoginAutomatico] loginAutomaticoWhitToken Failure',
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



export const selecionarManyUsuarioNoticiaFavoritado = createAction(
  '[UsuarioNoticiaFavoritado] selecionarManyUsuarioNoticiaFavoritado',
  props<{ usuarioId: number }>()
);

export const selecionarManyUsuarioNoticiaFavoritadoSuccess = createAction(
  '[UsuarioNoticiaFavoritado] selecionarManyUsuarioNoticiaFavoritado Success',
  props<{ 
    response: UsuarioNoticiaFavoritadoModel[],
  }>()
);

export const selecionarManyUsuarioNoticiaFavoritadoFailure = createAction(
  '[UsuarioNoticiaFavoritado] selecionarManyUsuarioNoticiaFavoritado Failure',
  props<{ error: any }>()
);

export const inserirUsuarioNoticiaFavoritado = createAction(
  '[UsuarioNoticiaFavoritado] inserirUsuarioNoticiaFavoritado',
  props<{ usuarioNoticiaFavoritado: UsuarioNoticiaFavoritadoModel }>()
);

export const inserirUsuarioNoticiaFavoritadoSuccess = createAction(
  '[UsuarioNoticiaFavoritado] inserirUsuarioNoticiaFavoritado Success',
  props<{ 
    response: UsuarioNoticiaFavoritadoModel,
  }>()
);

export const inserirUsuarioNoticiaFavoritadoFailure = createAction(
  '[UsuarioNoticiaFavoritado] inserirUsuarioNoticiaFavoritado Failure',
  props<{ error: any }>()
);

export const removerUsuarioNoticiaFavoritado = createAction(
  '[UsuarioNoticiaFavoritado] removerUsuarioNoticiaFavoritado',
  props<{ usuarioNoticiaFavoritado: UsuarioNoticiaFavoritadoModel }>()
);

export const removerUsuarioNoticiaFavoritadoSuccess = createAction(
  '[UsuarioNoticiaFavoritado] removerUsuarioNoticiaFavoritado Success',
  props<{ 
    response: number,
  }>()
);

export const removerUsuarioNoticiaFavoritadoFailure = createAction(
  '[UsuarioNoticiaFavoritado] removerUsuarioNoticiaFavoritado Failure',
  props<{ error: any }>()
);



export const selecionarManyUsuarioAulaCurtido = createAction(
  '[UsuarioAulaCurtido] selecionarManyUsuarioAulaCurtido',
  props<{ usuarioId: number }>()
);

export const selecionarManyUsuarioAulaCurtidoSuccess = createAction(
  '[UsuarioAulaCurtido] selecionarManyUsuarioAulaCurtido Success',
  props<{ 
    response: UsuarioAulaCurtidoModel[],
  }>()
);

export const selecionarManyUsuarioAulaCurtidoFailure = createAction(
  '[UsuarioAulaCurtido] selecionarManyUsuarioAulaCurtido Failure',
  props<{ error: any }>()
);

export const inserirUsuarioAulaCurtido = createAction(
  '[UsuarioAulaCurtido] inserirUsuarioAulaCurtido',
  props<{ usuarioAulaCurtido: UsuarioAulaCurtidoModel }>()
);

export const inserirUsuarioAulaCurtidoSuccess = createAction(
  '[UsuarioAulaCurtido] inserirUsuarioAulaCurtido Success',
  props<{ 
    response: UsuarioAulaCurtidoModel,
  }>()
);

export const inserirUsuarioAulaCurtidoFailure = createAction(
  '[UsuarioAulaCurtido] inserirUsuarioAulaCurtido Failure',
  props<{ error: any }>()
);

export const removerUsuarioAulaCurtido = createAction(
  '[UsuarioAulaCurtido] removerUsuarioAulaCurtido',
  props<{ usuarioAulaCurtido: UsuarioAulaCurtidoModel }>()
);

export const removerUsuarioAulaCurtidoSuccess = createAction(
  '[UsuarioAulaCurtido] removerUsuarioAulaCurtido Success',
  props<{ 
    response: number,
  }>()
);

export const removerUsuarioAulaCurtidoFailure = createAction(
  '[UsuarioAulaCurtido] removerUsuarioAulaCurtido Failure',
  props<{ error: any }>()
);




export const selecionarManyUsuarioAulaFavoritada = createAction(
  '[UsuarioAulaFavoritada] selecionarManyUsuarioAulaFavoritada',
  props<{ usuarioId: number }>()
);

export const selecionarManyUsuarioAulaFavoritadaSuccess = createAction(
  '[UsuarioAulaFavoritada] selecionarManyUsuarioAulaFavoritada Success',
  props<{ 
    response: UsuarioAulaFavoritadaModel[],
  }>()
);

export const selecionarManyUsuarioAulaFavoritadaFailure = createAction(
  '[UsuarioAulaFavoritada] selecionarManyUsuarioAulaFavoritada Failure',
  props<{ error: any }>()
);

export const inserirUsuarioAulaFavoritada = createAction(
  '[UsuarioAulaFavoritada] inserirUsuarioAulaFavoritada',
  props<{ usuarioAulaFavoritada: UsuarioAulaFavoritadaModel }>()
);

export const inserirUsuarioAulaFavoritadaSuccess = createAction(
  '[UsuarioAulaFavoritada] inserirUsuarioAulaFavoritada Success',
  props<{ 
    response: UsuarioAulaCurtidoModel,
  }>()
);

export const inserirUsuarioAulaFavoritadaFailure = createAction(
  '[UsuarioAulaFavoritada] inserirUsuarioAulaFavoritada Failure',
  props<{ error: any }>()
);

export const removerUsuarioAulaFavoritada = createAction(
  '[UsuarioAulaFavoritada] removerUsuarioAulaFavoritada',
  props<{ usuarioAulaFavoritada: UsuarioAulaFavoritadaModel }>()
);

export const removerUsuarioAulaFavoritadaSuccess = createAction(
  '[UsuarioAulaFavoritada] removerUsuarioAulaFavoritada Success',
  props<{ 
    response: number,
  }>()
);

export const removerUsuarioAulaFavoritadaFailure = createAction(
  '[UsuarioAulaFavoritada] removerUsuarioAulaFavoritada Failure',
  props<{ error: any }>()
);


export const selecionarAdministradorHomeAulaInformacao = createAction(
  '[AdministradorHome] AdministradorHomeAulaInformacao'
);

export const selecionarAdministradorHomeAulaInformacaoSuccess = createAction(
  '[AdministradorHome] AdministradorHomeAulaInformacao Success',
  props<{ response: AdministradorHomeAulaInformacaoModel }>()
);

export const selecionarAdministradorHomeAulaInformacaoFailure = createAction(
  '[AdministradorHome] AdministradorHomeAulaInformacao Failure',
  props<{ error: any }>()
);