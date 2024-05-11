import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import {
  VisualizarNoticiaComponent
} from 'src/app/componentes';

import { 
  AulaModel,
  NoticiaModel 
} from 'src/app/models';

import { 
  getManyNoticiaHome,
  selecionarNoticiaManyHome 
} from 'src/app/store';

import { 
  ProfessorPerfilVisualizarComponent 
} from '../perfil-professor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  noticiaManySubscription$: Subscription = new Subscription();
  noticiaMany$: Observable<NoticiaModel[]> = new Observable<NoticiaModel[]>();
  noticiaMany: NoticiaModel[] = [];

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

  visualizarNoticia(item: NoticiaModel) {
    this.dialog.open(VisualizarNoticiaComponent, {
      data: item.id,
      width: '90%',
      height: 'auto',
    });
  }

  visualizarUsuario(item: NoticiaModel) {
    this.dialog.open(ProfessorPerfilVisualizarComponent, {
      data: item.usuarioCadastroId,
      width: '80%',
      height: 'auto',
    }).afterClosed().subscribe((aula: AulaModel) => {
      if(aula)
        this.router.navigate([`visualizar-aula/${aula.id}`]);
    });
  }

  acessarNoticias() {
    this.router.navigate([`painel-noticia`]);
  }
}
