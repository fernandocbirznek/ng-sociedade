import { createAction, props } from '@ngrx/store';

import { 
    CriarContaPerfilModel,
    UsuarioModel,
} from '../../../../models';

export const selecionarUsuarioById = createAction(
    '[Usuario] selecionarUsuarioById',
    props<{ usuarioId: number }>()
);

export const selecionarUsuarioByIdSuccess = createAction(
    '[Usuario] selecionarUsuarioById Success',
    props<{ response: UsuarioModel }>()
);

export const selecionarUsuarioByIdFailure = createAction(
    '[Usuario] selecionarUsuarioById Failure',
    props<{ error: any }>()
);

export const selecionarManyUsuario = createAction(
    '[Usuario] selecionarManyUsuario'
);

export const selecionarManyUsuarioSuccess = createAction(
    '[Usuario] selecionarManyUsuario Success',
    props<{ response: UsuarioModel[] }>()
);

export const selecionarManyUsuarioFailure = createAction(
    '[Usuario] selecionarManyUsuario Failure',
    props<{ error: any }>()
);

export const criarUsuario = createAction(
    '[Usuario] criarUsuario',
    props<{ conta: CriarContaPerfilModel }>()
  );
  
export const criarUsuarioSuccess = createAction(
    '[Usuario] criarUsuario Success',
    props<{ conta: CriarContaPerfilModel, response: UsuarioModel }>()
);

export const criarUsuarioFailure = createAction(
    '[Usuario] criarUsuario Failure',
    props<{ error: any }>()
);


export const atualizarUsuario = createAction(
    '[Usuario] atualizarUsuario',
    props<{ usuario: UsuarioModel }>()
);

export const atualizarUsuarioSuccess = createAction(
    '[Usuario] atualizarUsuario Success',
    props<{ 
        usuario: UsuarioModel ,
        response: Date 
    }>()
);

export const atualizarUsuarioFailure = createAction(
    '[Usuario] atualizarUsuario Failure',
    props<{ error: any }>()
);

export const excluirUsuario = createAction(
    '[Usuario] excluirUsuario',
    props<{ usuarioId: number }>()
);

export const excluirUsuarioSuccess = createAction(
    '[Usuario] excluirUsuario Success',
    props<{ response: number }>()
);

export const excluirUsuarioFailure = createAction(
    '[Usuario] excluirUsuario Failure',
    props<{ error: any }>()
);