import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  InserirForumTagComponent,
  ModalExcluirComponent, 
} from '../../../../componentes';

import { 
  ForumTagModel,
  TabelaModel,
} from '../../../../models';

import { 
  excluirForumTag,
  getTabelaForumTag,
} from '../../../../store';

@Component({
  selector: 'app-administrador-tabela-forum-tag',
  templateUrl: './administrador-tabela-forum-tag.component.html',
  styleUrls: ['./administrador-tabela-forum-tag.component.css']
})
export class AdministradorTabelaForumTagComponent implements OnInit {

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
    this.tabela$ = this.store.select(getTabelaForumTag);
      this.tabelaSubscription$ = this.tabela$.subscribe(item => {
        this.tabela = item;
      });
  }

  criarForumTag() {
    this.dialog.open(InserirForumTagComponent, {
      maxHeight: '800px',
      width: '500px',
      height: 'auto',
    });
  }

  excluirForumTag(item: ForumTagModel) {
    this.dialog.open(ModalExcluirComponent, {
      data: `Fórum tag: ${item.titulo}`
    }).afterClosed().subscribe((evento) => {
      if(evento) {
        this.store.dispatch(excluirForumTag({ forumTagId: item.id }));
      }
    });
  }
}
