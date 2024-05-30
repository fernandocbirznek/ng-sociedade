import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  VisualizarNoticiaComponent 
} from 'src/app/componentes';

import { 
  NoticiaViewModel
} from 'src/app/models';

import { 
  getManyNoticiaByProfessorId, 
  selecionarNoticiaManyByProfessorId 
} from 'src/app/store';

@Component({
  selector: 'app-professor-perfil-visualizar-card-noticia',
  templateUrl: './professor-perfil-visualizar-card-noticia.component.html',
  styleUrls: ['./professor-perfil-visualizar-card-noticia.component.css']
})
export class ProfessorPerfilVisualizarCardNoticiaComponent implements OnInit {
  @Input() professorId: number = 0;

  noticiaManyByUsuarioIdSubscription$: Subscription = new Subscription();
  noticiaManyByUsuarioId$: Observable<NoticiaViewModel[]> = new Observable<NoticiaViewModel[]>();
  noticiaManyByUsuarioId: NoticiaViewModel[] = [];

  pageNoticiaMany: NoticiaViewModel[] = [];
  pageSize: number = 4;
  pageMax: number = 1;
  pageAtual: number = 0;

  constructor(
    public store: Store,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.setupNoticia();
  }

  ngOnDestroy() {
    this.noticiaManyByUsuarioIdSubscription$.unsubscribe();
  }

  setupNoticia() {
    this.store.dispatch(selecionarNoticiaManyByProfessorId({ professorId: this.professorId }));
    this.noticiaManyByUsuarioId$ = this.store.select(getManyNoticiaByProfessorId(this.professorId));
    this.noticiaManyByUsuarioIdSubscription$ = this.noticiaManyByUsuarioId$.subscribe(itens => {
      this.noticiaManyByUsuarioId = itens;
      this.setupPage();
    });
  }

  mudarPagina(page: number) {
    if (page < 0 && this.pageAtual - 1 >= 0)
      this.pageAtual--;
    if (page > 0 && this.pageAtual + 1 < this.pageMax)
      this.pageAtual++;

    this.pageNoticiaMany = this.noticiaManyByUsuarioId.slice(this.pageSize * this.pageAtual, (this.pageAtual + 1) * this.pageSize);
  }

  setupPage() {
    this.pageMax = Math.ceil(this.noticiaManyByUsuarioId.length/this.pageSize);
    this.pageNoticiaMany = this.noticiaManyByUsuarioId.slice(this.pageAtual, this.pageSize);
  }

  visualizarNoticia(item: NoticiaViewModel) {
    this.dialog.open(VisualizarNoticiaComponent, {
      data: item.id,
      width: '90%',
      height: 'auto',
    });
  }
}
