import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  ModalExcluirComponent, 
} from '../../../../componentes';

import { 
  AreaFisicaModel,
  AulaViewModel
} from '../../../../models';

import { 
  adicionarRota,
  alterarTituloPagina,
  atualizarAulaSelected,
  excluirAula,
  getManyAreaFisica,
  getManyAula,
} from '../../../../store';

@Component({
  selector: 'app-administrador-tabela-aula',
  templateUrl: './administrador-tabela-aula.component.html',
  styleUrls: ['./administrador-tabela-aula.component.css']
})
export class AdministradorTabelaAulaComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['titulo', 'resumo', 'areaFisica', 'data-postagem', 'comentarios', 'curtido', 'favoritado', 'acao'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  aulaManySubscription$: Subscription = new Subscription();
  aulaMany$: Observable<AulaViewModel[]> = new Observable<AulaViewModel[]>();

  areaFisicaManySubscription$: Subscription = new Subscription();
  areaFisicaMany$: Observable<AreaFisicaModel[]> = new Observable<AreaFisicaModel[]>();
  areaFisicaMany: AreaFisicaModel[] = [];

  constructor(
    public router: Router,
    public store: Store,
    private dialog: MatDialog,
  ) {}

  public ngOnInit() {
    this.setupAreaFisica();
    this.setupAula();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.areaFisicaManySubscription$.unsubscribe();
    this.aulaManySubscription$.unsubscribe();
  }

  setupAreaFisica() {
    this.areaFisicaMany$ = this.store.select(getManyAreaFisica);
    this.areaFisicaManySubscription$ = this.areaFisicaMany$.subscribe(itens => {
      this.areaFisicaMany = itens;
    });
  }

  setupAula() {
    this.aulaMany$ = this.store.select(getManyAula);
    this.aulaManySubscription$ = this.aulaMany$.subscribe(itens => {
      this.dataSource.data = itens;
    });
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
