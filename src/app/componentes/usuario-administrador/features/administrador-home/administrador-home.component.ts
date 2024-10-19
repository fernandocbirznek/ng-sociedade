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
  removerRota,
} from '../../../../store';

@Component({
  selector: 'app-administrador-home',
  templateUrl: './administrador-home.component.html',
  styleUrls: ['./administrador-home.component.css']
})
export class AdministradorHomeComponent implements OnInit {

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel | undefined> = new Observable<UsuarioModel | undefined>();
  usuarioLogado: UsuarioModel | undefined = undefined ;

  abaSelecionada: number = 1;
  abaSelecionadaSistema: number = 1;
  abaSelecionadaBasico: number = 1;

  constructor(
    public router: Router,
    public store: Store,
  ) {}

  ngOnInit(): void {
    this.setupUsuarioLogado();
  }

  ngOnDestroy() {
    this.usuarioLogadoSubscription$.unsubscribe();
  }

  setupUsuarioLogado() {
    this.usuarioLogado$ = this.store.select(getOneUsuarioLogado);
    this.usuarioLogadoSubscription$ = this.usuarioLogado$.subscribe(item => {
      if(item) {
        this.usuarioLogado = item;
      }  
    });
  }

  selecionarAba(item: number) {
    this.abaSelecionada = item;
  }

  selecionarAbaSistema(item: number) {
    this.abaSelecionadaSistema = item;
  }

  selecionarAbaBasico(item: number) {
    this.abaSelecionadaBasico = item;
  }

  deslogar() {
    this.store.dispatch(deslogarConta());
    this.store.dispatch(removerRota({ 
      rota: {
        rotaNome: '', 
        rotaAcessar: ``,
        rotaNivel: 1
      } 
    }));
    this.router.navigate(['']);
  }
}
