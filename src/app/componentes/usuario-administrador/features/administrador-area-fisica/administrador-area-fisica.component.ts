import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AtualizarAreaFisicaComponent,
  InserirAreaFisicaComponent,
  ModalExcluirComponent, 
} from '../../../../componentes';

import { 
  AreaFisicaModel,
  TabelaModel,
} from '../../../../models';

import { 
  adicionarRota,
  alterarTituloPagina,
  getManyAreaFisicaAdministradorTabela,
  removerAreaFisica,
} from '../../../../store';

@Component({
  selector: 'app-administrador-area-fisica',
  templateUrl: './administrador-area-fisica.component.html',
  styleUrls: ['./administrador-area-fisica.component.css']
})
export class AdministradorAreaFisicaComponent implements OnInit {

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
    this.tabela$ = this.store.select(getManyAreaFisicaAdministradorTabela);
    this.tabelaSubscription$ = this.tabela$.subscribe(item => {
      this.tabela = item;
    });
  }

  criarAreaFisica() {
    this.dialog.open(InserirAreaFisicaComponent, {
      maxHeight: '800px',
      width: '600px',
      height: 'auto',
    });
  }

  acessarAreaFisica(item: AreaFisicaModel) {
    this.store.dispatch(alterarTituloPagina({ titulo: item.titulo, areaFisicaId: item.id }));
    this.router.navigate([`mecanica/${item.id}`], { queryParams: { areaFisicaId: item.titulo }});
    this.store.dispatch(adicionarRota({ 
      rota: {
        rotaNome: item.titulo, 
        rotaAcessar: `mecanica/${item.id}`,
        rotaNivel: 2
      } 
    }));
  }

  editarAreaFisica(item: AreaFisicaModel) {
    this.dialog.open(AtualizarAreaFisicaComponent, {
      maxHeight: '800px',
      data: item,
      width: '600px',
      height: 'auto',
    });
  }

  excluirAreaFisica(item: AreaFisicaModel) {
    this.dialog.open(ModalExcluirComponent, {
      data: `Área da Física: ${item.titulo}`
    }).afterClosed().subscribe((evento) => {
      if(evento) {
        this.store.dispatch(removerAreaFisica({ areaFisicaId: item.id! }));
      }
    });
  }

}
