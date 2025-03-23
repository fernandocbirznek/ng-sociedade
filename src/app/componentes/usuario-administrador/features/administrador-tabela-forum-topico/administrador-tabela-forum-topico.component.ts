import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  ModalExcluirComponent 
} from '../../../../componentes';

import { 
  ForumTopicoModel,
  TabelaModel,
} from '../../../../models';

import { 
  adicionarRota,
  excluirForumTopico,
  getTabelaForumTopico,
} from '../../../../store';

@Component({
  selector: 'app-administrador-tabela-forum-topico',
  templateUrl: './administrador-tabela-forum-topico.component.html',
  styleUrls: ['./administrador-tabela-forum-topico.component.css']
})
export class AdministradorTabelaForumTopicoComponent implements OnInit {

  tabelaSubscription$: Subscription = new Subscription();
  tabela$: Observable<TabelaModel> = new Observable<TabelaModel>();
  tabela: TabelaModel = TabelaModel.create({});

  constructor(
    public router: Router,
    public store: Store,
    private dialog: MatDialog,
  ) {}

  public ngOnInit() {
    this.setupForumTopico();
  }

  ngOnDestroy() {
    this.tabelaSubscription$.unsubscribe();
  }

  setupForumTopico() {
    this.tabela$ = this.store.select(getTabelaForumTopico);
      this.tabelaSubscription$ = this.tabela$.subscribe(item => {
        this.tabela = item;
      });
  }

  visualizarForumTopico(item: ForumTopicoModel) {
    this.router.navigate([`forum/${item.forumId}/forum-topico/${item.id}`]);
    this.store.dispatch(adicionarRota({ 
      rota: {
        rotaNome: `fórum tópico`, 
        rotaAcessar: `forum/${item.forumId}/forum-topico/${item.id}`,
        rotaNivel: 2
      } 
    }));
  }

  excluirForumTopico(item: ForumTopicoModel) {
    this.dialog.open(ModalExcluirComponent, {
      data: `Fórum tópico: ${item.titulo}`
    }).afterClosed().subscribe((evento) => {
      if(evento) {
        this.store.dispatch(excluirForumTopico({ forumTopicoId: item.id }));
      }
    });
  }

}
