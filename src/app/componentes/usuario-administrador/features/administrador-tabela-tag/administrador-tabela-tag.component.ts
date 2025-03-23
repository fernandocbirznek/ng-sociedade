import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  InserirTagComponent,
  ModalExcluirComponent, 
} from '../../../../componentes';

import { 
  TabelaModel,
  TagModel,
} from '../../../../models';

import { 
  excluirTag,
  getTabelaTag,
} from '../../../../store';

@Component({
  selector: 'app-administrador-tabela-tag',
  templateUrl: './administrador-tabela-tag.component.html',
  styleUrls: ['./administrador-tabela-tag.component.css']
})
export class AdministradorTabelaTagComponent implements OnInit {
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
    this.tabela$ = this.store.select(getTabelaTag);
      this.tabelaSubscription$ = this.tabela$.subscribe(item => {
        this.tabela = item;
      });
  }

  criarTag() {
    this.dialog.open(InserirTagComponent, {
      maxHeight: '800px',
      width: '500px',
      height: 'auto',
    });
  }

  excluirTag(item: TagModel) {
    this.dialog.open(ModalExcluirComponent, {
      data: `Tag: ${item.nome}`
    }).afterClosed().subscribe((evento) => {
      if(evento) {
        this.store.dispatch(excluirTag({ tagId: item.id! }));
      }
    });
  }

}
