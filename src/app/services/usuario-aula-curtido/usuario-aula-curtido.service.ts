import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    UsuarioAulaCurtidoModel, 
} from "src/app/models";

@Injectable({
    providedIn: 'root'
})

export class UsuarioAulaCurtidoService {
    urlSelecionarManyAulaCurtidoByUsuarioId = 'https://localhost:44303/api/UsuarioAulaCurtido/selecionar-usuario-aula-curtido';
    urlInserirUsuarioAulaCurtido = 'https://localhost:44303/api/UsuarioAulaCurtido/inserir';
    urlRemoverUsuarioAulaCurtido = 'https://localhost:44303/api/UsuarioAulaCurtido/excluir';

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