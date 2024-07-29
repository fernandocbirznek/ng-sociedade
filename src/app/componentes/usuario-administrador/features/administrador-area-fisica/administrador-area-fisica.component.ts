import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AtualizarAreaFisicaComponent,
  InserirAreaFisicaComponent,
  ModalExcluirComponent, 
} from 'src/app/componentes';

import { 
  AreaFisicaModel,
} from 'src/app/models';

import { 
  adicionarRota,
  alterarTituloPagina,
  getManyAreaFisica,
  removerAreaFisica,
} from 'src/app/store';

@Component({
  selector: 'app-administrador-area-fisica',
  templateUrl: './administrador-area-fisica.component.html',
  styleUrls: ['./administrador-area-fisica.component.css']
})
export class AdministradorAreaFisicaComponent implements OnInit {

  displayedColumns: string[] = ['titulo', 'data-postagem', 'data-atualizacao', 'acao'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.areaFisicaManySubscription$.unsubscribe();
  }

  setupAreaFisica() {
    this.areaFisicaMany$ = this.store.select(getManyAreaFisica);
    this.areaFisicaManySubscription$ = this.areaFisicaMany$.subscribe(itens => {
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
