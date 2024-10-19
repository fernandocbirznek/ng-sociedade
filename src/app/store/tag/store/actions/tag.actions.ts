import { createAction, props } from '@ngrx/store';

import { 
    TagModel,
} from '../../../../models';

export const selecionarManyTag = createAction(
    '[Tag] selecionarManyTag'
);

export const selecionarManyTagSuccess = createAction(
    '[Tag] selecionarManyTag Success',
    props<{ response: TagModel[] }>()
);

export const selecionarManyTagFailure = createAction(
    '[Tag] selecionarManyTag Failure',
    props<{ error: any }>()
);

export const inserirTag = createAction(
    '[Tag] inserirTag',
    props<{ tag: TagModel }>()
);
  
export const inserirTagSuccess = createAction(
    '[Tag] inserirTag Success',
    props<{ response: TagModel }>()
);
  
export const inserirTagFailure = createAction(
    '[Tag] inserirTag Failure',
    props<{ error: any }>()
);

export const excluirTag = createAction(
    '[Tag] excluirTag',
    props<{ tagId: number }>()
);
  
export const excluirTagSuccess = createAction(
    '[Tag] excluirTag Success',
    props<{ response: number }>()
);
  
export const excluirTagFailure = createAction(
    '[Tag] excluirTag Failure',
    props<{ error: any }>()
);
