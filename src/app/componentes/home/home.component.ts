import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import {
  ProfessorPerfilVisualizarComponent,
  VisualizarNoticiaComponent
} from '../../componentes';

import { 
  AulaModel,
  NoticiaViewModel
} from '../../models';

import { 
  adicionarRota,
  getManyNoticiaHome,
  selecionarNoticiaManyHome 
} from '../../store';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  noticiaManySubscription$: Subscription = new Subscription();
  noticiaMany$: Observable<NoticiaViewModel[]> = new Observable<NoticiaViewModel[]>();
  noticiaMany: NoticiaViewModel[] = [];

  constructor(
    public store: Store,
    private dialog: MatDialog,
    public router: Router,
  ) {
    //TODO, ficar aqui ou alterar para o resolver global?
    this.store.dispatch(selecionarNoticiaManyHome());
  }

  ngOnInit(): void {
    this.setupNoticia();
  }

  ngOnDestroy() {
    this.noticiaManySubscription$.unsubscribe();
  }

  setupNoticia() {
    this.noticiaMany$ = this.store.select(getManyNoticiaHome);
    this.noticiaManySubscription$ = this.noticiaMany$.subscribe(itens => {
      this.noticiaMany = itens;
    });
  }

  visualizarNoticia(item: NoticiaViewModel) {
    this.dialog.open(VisualizarNoticiaComponent, {
      data: item.id,
      width: '90%',
      height: 'auto',
      maxHeight: '90%',
    });
  }

  visualizarUsuario(item: NoticiaViewModel) {
    this.dialog.open(ProfessorPerfilVisualizarComponent, {
      data: item.usuarioCadastroId,
      width: '80%',
      height: 'atuo',
      maxHeight: '90%',
    }).afterClosed().subscribe((aula: AulaModel) => {
      if(aula) {
        this.store.dispatch(adicionarRota({ 
          rota: {
            rotaNome: 'aula', 
            rotaAcessar: `visualizar-aula/${aula.id}`,
            rotaNivel: 1
          } 
        }));
        this.router.navigate([`visualizar-aula/${aula.id}`]);
      }
    });
  }

  acessarNoticias() {
    this.store.dispatch(adicionarRota({ 
      rota: {
        rotaNome: 'painel de noticias', 
        rotaAcessar: `painel-noticia`,
        rotaNivel: 1
      } 
    }));
    this.router.navigate([`painel-noticia`]);
  }
}
