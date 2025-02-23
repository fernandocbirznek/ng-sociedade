import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    UsuarioAulaCurtidoModel, 
} from "../../models";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class UsuarioAulaCurtidoService {
    private readonly baseUrl = `${environment.aulaApiUrl}/UsuarioAulaCurtido`;
    urlSelecionarManyAulaCurtidoByUsuarioId = `${this.baseUrl}/selecionar-usuario-aula-curtido`;
    urlInserirUsuarioAulaCurtido = `${this.baseUrl}/inserir`;
    urlRemoverUsuarioAulaCurtido = `${this.baseUrl}/excluir`;

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    selecionarManyAulaCurtidoByUsuarioId(usuarioId: number): Observable<UsuarioAulaCurtidoModel[]> {
        return this.httpClient.get<UsuarioAulaCurtidoModel[]>(this.urlSelecionarManyAulaCurtidoByUsuarioId + `/${usuarioId}`);
    }

    inserirUsuarioAulaCurtido(usuarioAulaCurtido: UsuarioAulaCurtidoModel): Observable<UsuarioAulaCurtidoModel> {
        return this.httpClient.post<UsuarioAulaCurtidoModel>(
            this.urlInserirUsuarioAulaCurtido, 
            JSON.stringify(usuarioAulaCurtido), 
            this.buildHttpOptions()
        );
    }

    removerUsuarioAulaCurtido(usuarioAulaCurtidoId: number, aulaId: number): Observable<number> {
        return this.httpClient.delete<number>(this.urlRemoverUsuarioAulaCurtido + `/${usuarioAulaCurtidoId}` + '/aula' + `/${aulaId}`);
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}