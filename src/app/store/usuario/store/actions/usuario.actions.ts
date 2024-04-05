import { createAction, props } from '@ngrx/store';

import { 
    UsuarioModel,
} from 'src/app/models';

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