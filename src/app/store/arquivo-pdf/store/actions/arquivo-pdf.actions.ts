import { createAction, props } from "@ngrx/store";

import { 
    ArquivoPdfCommandModel, 
    ArquivoPdfCommandResponseModel
} from "src/app/models";

export const selecionarManyArquivoPdfByAulaId = createAction(
  '[ArquivoPdf] selecionarManyArquivoPdfByAulaId',
  props<{ aulaId: number }>()
);

export const selecionarManyArquivoPdfByAulaIdSuccess = createAction(
'[ArquivoPdf] selecionarManyArquivoPdfByAulaId Success',
props<{ response: any[] }>()
);

export const selecionarManyArquivoPdfByAulaIdFailure = createAction(
'[ArquivoPdf] selecionarManyArquivoPdfByAulaId Failure',
props<{ error: any }>()
);

export const inserirArquivoPdf = createAction(
  '[ArquivoPdf] inserirArquivoPdf',
  props<{ arquivoPdfCommand: ArquivoPdfCommandModel }>()
);
  
export const inserirArquivoPdfSuccess = createAction(
  '[Aula] inserirArquivoPdf Success',
  props<{ arquivoPdfCommand: ArquivoPdfCommandModel, response: any }>()
);

export const inserirArquivoPdfFailure = createAction(
  '[Aula] inserirArquivoPdf Failure',
  props<{ error: any }>()
);