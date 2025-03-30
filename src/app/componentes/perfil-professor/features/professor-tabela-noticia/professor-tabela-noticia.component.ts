import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  EditarNoticiaComponent,
  ModalExcluirComponent, 
  NovaNoticiaComponent,
  VisualizarNoticiaComponent
} from '../../../../componentes';

import { 
  NoticiaModel,
  TabelaModel
} from '../../../../models';

import { 
  excluirNoticia,
  getTabelaNoticiaByProfessorId, 
} from '../../../../store';

@Component({
  selector: 'app-professor-tabela-noticia',
  templateUrl: './professor-tabela-noticia.component.html',
  styleUrls: ['./professor-tabela-noticia.component.css']
})
export class ProfessorTabelaNoticiaComponent implements OnInit {

  @Input() professorId: number = 0;

  tabelaSubscription$: Subscription = new Subscription();
  tabela$: Observable<TabelaModel> = new Observable<TabelaModel>();
  tabela: TabelaModel = TabelaModel.create({});

  constructor(
    public router: Router,
    public store: Store,
    private dialog: MatDialog,
  ) {}

  public ngOnInit() {
    this.setupTabela();
  }

  ngOnDestroy() {
    this.tabelaSubscription$.unsubscribe();
  }

  setupTabela() {
    this.tabela$ = this.store.select(getTabelaNoticiaByProfessorId(this.professorId));
    this.tabelaSubscription$ = this.tabela$.subscribe(item => {
      this.tabela = item;
    });
  }

  criarNoticia() {
    this.dialog.open(NovaNoticiaComponent);
  }

  acessarNoticia(item: NoticiaModel) {
    this.dialog.open(VisualizarNoticiaComponent, {
      data: item.id,
      width: '90%',
      height: 'auto',
    });
  }

  editarNoticia(item: NoticiaModel) {
    this.dialog.open(EditarNoticiaComponent, {
      data: item,
      width: '90%',
      height: '90%',
    });
  }

  excluirNoticia(item: NoticiaModel) {
    this.dialog.open(ModalExcluirComponent, {
      data: `Noticia: ${item.titulo}`
    }).afterClosed().subscribe((evento) => {
      if(evento) {
        this.store.dispatch(excluirNoticia({ noticiaId: item }));
      }
    });
  }

}
