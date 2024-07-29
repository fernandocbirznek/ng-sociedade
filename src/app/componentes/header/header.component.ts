import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { 
  AreaFisicaModel, 
  HeaderRotaModel, 
  TipoUsuarioEnum, 
  UsuarioModel 
} from 'src/app/models';

import { 
  adicionarRota,
  alterarTituloPagina,
  getManyAreaFisica,
  getManyRota,
  getOneUsuarioLogado,
  getTituloPagina,
  removerRota,
} from 'src/app/store';

import { 
  LoginCriarContaComponent 
} from '../topicos';

import { HeaderHelpers } from './helpers/header.helpers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  areaFisicaManySubscription$: Subscription = new Subscription();
  areaFisicaMany$: Observable<AreaFisicaModel[]> = new Observable<AreaFisicaModel[]>();
  areaFisicaMany: AreaFisicaModel[] = [];

  headerTituloSubscription$: Subscription = new Subscription();
  headerTitulo$: Observable<string> = new Observable<string>();
  headerTitulo: string = 'Home';

  rotaManySubscription$: Subscription = new Subscription();
  rotaMany$: Observable<HeaderRotaModel[]> = new Observable<HeaderRotaModel[]>();
  rotaMany: HeaderRotaModel[] = [];

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel | undefined> = new Observable<UsuarioModel | undefined>();
  usuarioLogado: UsuarioModel | undefined = undefined;
  
  public imagem: string = "../../../assets/imagens/header/home.png";
  public resumoTopico: string = "Aqui é a página principal, nela temos um resumo sobre a Física," 
  + "na esquerda temos as últimas postagens...";

  constructor(
    public dialog: MatDialog,
    public router: Router,
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.setupAreaFisica();
    this.setupHeaderTitulo();
    this.setupRota();
    this.setupUsuarioLogado();
  }

  ngOnDestroy() {
    this.areaFisicaManySubscription$.unsubscribe();
    this.headerTituloSubscription$.unsubscribe();
    this.rotaManySubscription$.unsubscribe();
    this.usuarioLogadoSubscription$.unsubscribe();
  }

  setupAreaFisica() {
    this.areaFisicaMany$ = this.store.select(getManyAreaFisica);
    this.areaFisicaManySubscription$ = this.areaFisicaMany$.subscribe(itens => {
      this.areaFisicaMany = itens;
    });
  }

  setupHeaderTitulo() {
    this.headerTitulo$ = this.store.select(getTituloPagina);
    this.headerTituloSubscription$ = this.headerTitulo$.subscribe(item => {
      this.headerTitulo = item;
    });
  }

  setupRota() {
    this.rotaMany$ = this.store.select(getManyRota);
    this.rotaManySubscription$ = this.rotaMany$.subscribe(itens => {
      this.rotaMany = itens;
    });
  }

  setupUsuarioLogado() {
    this.usuarioLogado$ = this.store.select(getOneUsuarioLogado);
    this.usuarioLogadoSubscription$ = this.usuarioLogado$.subscribe(item => {
      this.usuarioLogado = item;
    });
  }

  areaSelecionada(areaFisica: AreaFisicaModel) {
    this.store.dispatch(adicionarRota({ 
      rota: {rotaNome:  areaFisica.titulo, 
      rotaAcessar: `mecanica/${areaFisica.id}`,
      rotaNivel: 1} 
    }));
    this.store.dispatch(alterarTituloPagina({ titulo: areaFisica.titulo, areaFisicaId: areaFisica.id }));
    this.router.navigate([`mecanica/${areaFisica.id}`], { queryParams: { areaFisicaId: areaFisica.titulo }});
  }

  conta() {
    this.dialog.open(LoginCriarContaComponent, {
      maxHeight: '800px',
      height: 'auto',
    });
  }

  acessarPerfil() {
    if (this.usuarioLogado) {
      this.store.dispatch(alterarTituloPagina({ titulo: '', areaFisicaId: 0 }));
      switch(this.usuarioLogado.tipoUsuario) { 
        case TipoUsuarioEnum.UsuarioAdministrador: { 
          this.store.dispatch(adicionarRota({ 
            rota: {rotaNome: "administrador-home", 
            rotaAcessar: `administrador-home/${this.usuarioLogado.email}/${this.usuarioLogado.id}`,
            rotaNivel: 1} 
          }));
          this.router.navigate([`administrador-home/${this.usuarioLogado.email}/${this.usuarioLogado.id}`])
          break; 
        } 
        case TipoUsuarioEnum.UsuarioComum: { 
          this.store.dispatch(adicionarRota({ 
            rota: {rotaNome: "aluno-home", 
            rotaAcessar: `aluno-home/${this.usuarioLogado.email}/${this.usuarioLogado.id}`,
            rotaNivel: 1} 
          }));
          this.router.navigate([`aluno-home/${this.usuarioLogado.email}/${this.usuarioLogado.id}`])
          break; 
        } 
        case TipoUsuarioEnum.UsuarioProfessor: { 
          this.store.dispatch(adicionarRota({ 
            rota: {rotaNome: "professor-home", 
            rotaAcessar: `perfil-professor/${this.usuarioLogado.email}/${this.usuarioLogado.id}`,
            rotaNivel: 1} 
          }));
          this.router.navigate([`perfil-professor/${this.usuarioLogado.email}/${this.usuarioLogado.id}`])
          break; 
        } 
        case TipoUsuarioEnum.UsuarioProfessorAdministrador: { 
          //TODO, professor administrador; 
        break; 
        } 
        default: {
          this.store.dispatch(removerRota({ 
            rota: {
              rotaNome: '', 
              rotaAcessar: ``,
              rotaNivel: 1
            } 
          }));
          this.router.navigate(['']);
          break; 
        } 
      }
    }
  }

  acessarTela(item: string) {
    if (item == 'home') {
      this.store.dispatch(removerRota({ 
        rota: {rotaNome: "", 
        rotaAcessar: ``,
        rotaNivel: 1} 
      }));
      this.store.dispatch(alterarTituloPagina({ titulo: item, areaFisicaId: 0 }));
      this.router.navigate(['']);
    }
    if (item == 'forum') {
      this.store.dispatch(adicionarRota({ 
        rota: {
          rotaNome: "forum", 
          rotaAcessar: `forum`,
          rotaNivel: 1
        } 
      }));
      this.store.dispatch(alterarTituloPagina({ titulo: item, areaFisicaId: 0 }));
      this.router.navigate(['forum']);
    }
  }

  rotaAcessar(item: string) {
    this.router.navigate([item]);
  }

  mudaFoto (foto: string) {
		let item = HeaderHelpers.mudaFoto(foto);
    this.imagem = item.imagem;
    this.resumoTopico = item.resumoTopico;
	}
}