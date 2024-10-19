import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    ArquivoPdfCommandModel,
    ArquivoPdfCommandResponseModel,
} from "../../models";

@Injectable({
    providedIn: 'root'
})

export class ArquivoPdfService {
    urlSelecionarManyArquivoPdfByAulaId = 'https://localhost:44303/api/ArquivoPdf/arquivo-pdf-many';
    urlInserirArquivoPdf = 'https://localhost:44303/api/ArquivoPdf/inserir';

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}
    inserirArquivoPdf(arquivoPdfCommandModel: ArquivoPdfCommandModel): Observable<ArquivoPdfCommandResponseModel> {
        const formData: FormData = new FormData();

        if (arquivoPdfCommandModel.file)
            formData.append('file', arquivoPdfCommandModel.file);
        if (arquivoPdfCommandModel.aulaSessao)
            formData.append('aulaSessao', JSON.stringify(arquivoPdfCommandModel.aulaSessao));

        return this.httpClient.post<ArquivoPdfCommandResponseModel>(
            this.urlInserirArquivoPdf, 
            formData, 
            this.buildHttpOptionsForMultipart()
        );
    }

    selecionarManyArquivoPdfByAulaId(aulaId: number): Observable<ArquivoPdfCommandModel[]> {
        return this.httpClient.get<ArquivoPdfCommandModel[]>(
            this.urlSelecionarManyArquivoPdfByAulaId + `/${aulaId}`, 
            this.buildHttpOptionsForMultipart()
        );
    }

    private buildHttpOptionsForMultipart() {
        return {
            headers: new HttpHeaders()
                .set('Accept', 'application/json')
        };
    }
}