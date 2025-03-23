import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  ModalExcluirComponent, 
} from '../../../../componentes';

import { 
  AulaViewModel,
  TabelaModel
} from '../../../../models';

import { 
  adicionarRota,
  alterarTituloPagina,
  atualizarAulaSelected,
  excluirAula,
  getManyAulaAdministrador,
} from '../../../../store';

@Component({
  selector: 'app-administrador-tabela-aula',
  templateUrl: './administrador-tabela-aula.component.html',
  styleUrls: ['./administrador-tabela-aula.component.css']
})
export class AdministradorTabelaAulaComponent implements OnInit {

  tabelaSubscription$: Subscription = new Subscription();
  tabela$: Observable<TabelaModel> = new Observable<TabelaModel>();
  tabela: TabelaModel = TabelaModel.create({});

  constructor(
    public router: Router,
    public store: Store,
    private dialog: MatDialog,
  ) {}

  public ngOnInit() {
    this.setupAula();
  }

  ngOnDestroy() {
    this.tabelaSubscription$.unsubscribe();
  }

  setupAula() {
    this.tabela$ = this.store.select(getManyAulaAdministrador);
    this.tabelaSubscription$ = 
      this.tabela$.subscribe(item => {
        this.tabela = item;
      });
  }

  acessarAula(item: AulaViewModel) {
    this.store.dispatch(alterarTituloPagina({ titulo: `${item.titulo}`, areaFisicaId: item.areaFisicaId }));
    this.store.dispatch(atualizarAulaSelected({ aulaId: item.id }));
    this.router.navigate([`visualizar-aula/${item.id}`], { queryParams: { aulaTitulo: item.titulo }});
    this.store.dispatch(adicionarRota({ 
      rota: {
        rotaNome: `${item.titulo}`, 
        rotaAcessar: `visualizar-aula/${item.id}`,
        rotaNivel: 2
      } 
    }));
  }

  excluirAula(item: AulaViewModel) {
    this.dialog.open(ModalExcluirComponent, {
      data: `Aula: ${item.titulo}`
    }).afterClosed().subscribe((evento) => {
      if(evento) {
        this.store.dispatch(excluirAula({ aulaId: item.id! }));
      }
    });
  }

}
