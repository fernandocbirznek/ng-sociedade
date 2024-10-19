import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  UsuarioModel 
} from '../../../../models';

import { 
  deslogarConta,
  getOneUsuarioLogado,
  removerRota
} from '../../../../store';

@Component({
  selector: 'app-aluno-home',
  templateUrl: './aluno-home.component.html',
  styleUrls: ['./aluno-home.component.css']
})
export class AlunoHomeComponent implements OnInit {

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel | undefined> = new Observable<UsuarioModel | undefined>();
  usuarioLogado: UsuarioModel | undefined = undefined ;

  abaSelecionada: number = 1;

  constructor(
    public router: Router,
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.setupUsuarioLogado();
  }

  ngOnDestroy() {
    this.usuarioLogadoSubscription$.unsubscribe();
  }

  setupUsuarioLogado() {
    this.usuarioLogado$ = this.store.select(getOneUsuarioLogado);
    this.usuarioLogadoSubscription$ = this.usuarioLogado$.subscribe(item => {
      if(item)
        this.usuarioLogado = item;
    });
  }

  selecionarAba(item: number) {
    this.abaSelecionada = item;
  }

  deslogar() {
    this.store.dispatch(deslogarConta());
    this.router.navigate(['']);
    this.store.dispatch(removerRota({ 
      rota: {
        rotaNome: '', 
        rotaAcessar: ``,
        rotaNivel: 1
      } 
    }));
  }
}
