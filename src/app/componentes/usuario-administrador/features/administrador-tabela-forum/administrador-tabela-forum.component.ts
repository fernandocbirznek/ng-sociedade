import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AtualizarForumComponent,
  InserirForumComponent,
  ModalExcluirComponent, 
} from '../../../../componentes';

import { 
  ForumModel,
  TabelaModel,
} from '../../../../models';

import { 
  excluirForum,
  getTabelaForum,
} from '../../../../store';

@Component({
  selector: 'app-administrador-tabela-forum',
  templateUrl: './administrador-tabela-forum.component.html',
  styleUrls: ['./administrador-tabela-forum.component.css']
})
export class AdministradorTabelaForumComponent implements OnInit {

  tabelaSubscription$: Subscription = new Subscription();
  tabela$: Observable<TabelaModel> = new Observable<TabelaModel>();
  tabela: TabelaModel = TabelaModel.create({});

  constructor(
    public router: Router,
    public store: Store,
    private dialog: MatDialog,
  ) {}

  public ngOnInit() {
    this.setupForum();
  }

  ngOnDestroy() {
    this.tabelaSubscription$.unsubscribe();
  }

  setupForum() {
    this.tabela$ = this.store.select(getTabelaForum);
      this.tabelaSubscription$ = this.tabela$.subscribe(item => {
        this.tabela = item;
      });
  }

  criarForum() {
    this.dialog.open(InserirForumComponent, {
      maxHeight: '800px',
      width: '500px',
      height: 'auto',
    });
  }

  editarForum(item: ForumModel) {
    this.dialog.open(AtualizarForumComponent, {
      data: item,
      width: '600px'
    });
  }

  excluirForum(item: ForumModel) {
    this.dialog.open(ModalExcluirComponent, {
      data: `Fórum: ${item.titulo}`
    }).afterClosed().subscribe((evento) => {
      if(evento) {
        this.store.dispatch(excluirForum({ forumId: item.id }));
      }
    });
  }
}
