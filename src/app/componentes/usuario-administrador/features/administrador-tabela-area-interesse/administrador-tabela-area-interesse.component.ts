import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  InserirAreaInteresseComponent,
  ModalExcluirComponent, 
} from '../../../../componentes';

import { 
  AreaInteresseModel,
  TabelaModel,
} from '../../../../models';

import { 
  excluirAreaInteresse,
  getTabelaAreaInteresse,
} from '../../../../store';

@Component({
  selector: 'app-administrador-tabela-area-interesse',
  templateUrl: './administrador-tabela-area-interesse.component.html',
  styleUrls: ['./administrador-tabela-area-interesse.component.css']
})
export class AdministradorTabelaAreaInteresseComponent implements OnInit {
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
    this.tabela$ = this.store.select(getTabelaAreaInteresse);
      this.tabelaSubscription$ = this.tabela$.subscribe(item => {
        this.tabela = item;
      });
  }

  criarAreaInteresse() {
    this.dialog.open(InserirAreaInteresseComponent, {
      maxHeight: '800px',
      width: '500px',
      height: 'auto',
    });
  }

  excluirAreaInteresse(item: AreaInteresseModel) {
    this.dialog.open(ModalExcluirComponent, {
      data: `Área de interesse: ${item.nome}`
    }).afterClosed().subscribe((evento) => {
      if(evento) {
        this.store.dispatch(excluirAreaInteresse({ areaInteresseId: item.id }));
      }
    });
  }

}
