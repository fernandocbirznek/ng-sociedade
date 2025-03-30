import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  ModalExcluirComponent, 
  NovaAulaComponent
} from '../../../../componentes';

import { 
  AulaModel, 
  AulaViewModel,
  TabelaModel
} from '../../../../models';

import { 
  adicionarRota,
  alterarTituloPagina,
  atualizarAulaPublicado,
  excluirAula,
  getTabelaAulaByProfessorId, 
} from '../../../../store';


@Component({
  selector: 'app-professor-tabela-aula',
  templateUrl: './professor-tabela-aula.component.html',
  styleUrls: ['./professor-tabela-aula.component.css']
})
export class ProfessorTabelaAulaComponent implements OnInit {
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
    this.tabela$ = this.store.select(getTabelaAulaByProfessorId(this.professorId));
    this.tabelaSubscription$ = this.tabela$.subscribe(item => {
      this.tabela = item;
    });
  }

  criarAula() {
    this.dialog.open(NovaAulaComponent);
  }

  acessarAula(item: AulaModel) {
    this.store.dispatch(alterarTituloPagina({ titulo: `${item.titulo}`, areaFisicaId: item.areaFisicaId }));
    this.store.dispatch(adicionarRota({ 
      rota: {
        rotaNome: `${item.titulo}`, 
        rotaAcessar: `visualizar-aula/${item.id}`,
        rotaNivel: 2
      } 
    }));
    this.router.navigate([`visualizar-aula/${item.id}`]);
  }

  editarAula(item: AulaModel) {
    this.store.dispatch(adicionarRota({ 
      rota: {
        rotaNome: `editar/${item.titulo}`, 
        rotaAcessar: `editar-aula/${item.id}`,
        rotaNivel: 2
      } 
    }));
    this.router.navigate([`editar-aula/${item.id}`]);
  }

  excluirAula(item: AulaModel) {
    this.dialog.open(ModalExcluirComponent, {
      data: `Aula: ${item.titulo}`
    }).afterClosed().subscribe((evento) => {
      if(evento) {
        this.store.dispatch(excluirAula({ aulaId: item.id! }));
      }
    });
  }

  publicar(item: AulaModel) {
    let request: AulaViewModel = new AulaViewModel();
    request.id = item.id;
    request.publicado = !item.publicado;

    this.store.dispatch(atualizarAulaPublicado({ aula: request }));
  }
}
