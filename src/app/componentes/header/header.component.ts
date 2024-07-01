import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { 
  AreaFisicaModel, 
  TipoUsuarioEnum, 
  UsuarioModel 
} from 'src/app/models';

import { 
  alterarTituloPagina,
  getManyAreaFisica,
  getOneUsuarioLogado,
  getTituloPagina,
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
    this.setupUsuarioLogado();
  }

  ngOnDestroy() {
    this.areaFisicaManySubscription$.unsubscribe();
    this.headerTituloSubscription$.unsubscribe();
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

  setupUsuarioLogado() {
    this.usuarioLogado$ = this.store.select(getOneUsuarioLogado);
    this.usuarioLogadoSubscription$ = this.usuarioLogado$.subscribe(item => {
      this.usuarioLogado = item;
    });
  }

  areaSelecionada(areaFisica: AreaFisicaModel) {
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
          this.router.navigate([`administrador-home/${this.usuarioLogado.email}/${this.usuarioLogado.id}`])
          break; 
        } 
        case TipoUsuarioEnum.UsuarioComum: { 
          this.router.navigate([`aluno-home/${this.usuarioLogado.email}/${this.usuarioLogado.id}`])
          break; 
        } 
        case TipoUsuarioEnum.UsuarioProfessor: { 
          this.router.navigate([`perfil-professor/${this.usuarioLogado.email}/${this.usuarioLogado.id}`])
          break; 
        } 
        case TipoUsuarioEnum.UsuarioProfessorAdministrador: { 
          //TODO, professor administrador; 
        break; 
        } 
        default: { 
          this.router.navigate(['']);
          break; 
        } 
      }
    }
  }

  home() {
    this.router.navigate(['']);
  }

  mudaFoto (foto: string) {
		let item = HeaderHelpers.mudaFoto(foto);
    this.imagem = item.imagem;
    this.resumoTopico = item.resumoTopico;
	}
}