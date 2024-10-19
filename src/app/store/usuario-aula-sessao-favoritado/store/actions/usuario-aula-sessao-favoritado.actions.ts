import { createAction, props } from '@ngrx/store';

import { 
    TipoSessaoAulaEnum,
    UsuarioAulaSessaoFavoritadoModel,
} from '../../../../models';

export const selecionarManyUsuarioAulaSessaoFavoritadoByUsuarioId = createAction(
    '[UsuarioAulaSessaoFavoritadoModel] selecionarManyUsuarioAulaSessaoFavoritadoByUsuarioId',
    props<{ usuarioId: number }>()
);

export const selecionarManyUsuarioAulaSessaoFavoritadoByUsuarioIdSuccess = createAction(
    '[UsuarioAulaSessaoFavoritadoModel] selecionarManyUsuarioAulaSessaoFavoritadoByUsuarioId Success',
    props<{ response: UsuarioAulaSessaoFavoritadoModel[] }>()
);

export const selecionarManyUsuarioAulaSessaoFavoritadoByUsuarioIdFailure = createAction(
    '[UsuarioAulaSessaoFavoritadoModel] selecionarManyUsuarioAulaSessaoFavoritadoByUsuarioId Failure',
    props<{ error: any }>()
);

export const inserirUsuarioAulaSessaoFavoritado = createAction(
    '[UsuarioAulaSessaoFavoritadoModel] inserirUsuarioAulaSessaoFavoritado',
    props<{ usuarioAulaSessaoFavoritado: UsuarioAulaSessaoFavoritadoModel }>()
);

export const inserirUsuarioAulaSessaoFavoritadoSuccess = createAction(
    '[UsuarioAulaSessaoFavoritadoModel] inserirUsuarioAulaSessaoFavoritado Success',
    props<{ response: UsuarioAulaSessaoFavoritadoModel }>()
);

export const inserirUsuarioAulaSessaoFavoritadoFailure = createAction(
    '[UsuarioAulaSessaoFavoritadoModel] inserirUsuarioAulaSessaoFavoritado Failure',
    props<{ error: any }>()
);

export const removerUsuarioAulaSessaoFavoritado = createAction(
    '[UsuarioAulaSessaoFavoritadoModel] removerUsuarioAulaSessaoFavoritado',
    props<{ aulaSessaoId: number, usuarioId: number  }>()
);

export const removerUsuarioAulaSessaoFavoritadoSuccess = createAction(
    '[UsuarioAulaSessaoFavoritadoModel] removerUsuarioAulaSessaoFavoritado Success',
    props<{ response: number }>()
);

export const removerUsuarioAulaSessaoFavoritadoFailure = createAction(
    '[UsuarioAulaSessaoFavoritadoModel] removerUsuarioAulaSessaoFavoritado Failure',
    props<{ error: any }>()
);

export const alterarTipoSessaoAulaEnum = createAction(
    '[UsuarioAulaSessaoFavoritadoModel] alterarTipoSessaoAulaEnum',
    props<{ tipoSessaoAulaEnum: TipoSessaoAulaEnum }>()
);