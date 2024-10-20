import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  InserirAreaInteresseComponent,
  ModalExcluirComponent, 
} from '../../../../componentes';

import { 
  AreaInteresseModel,
} from '../../../../models';

import { 
  excluirAreaInteresse,
  getManyAreaInteresse,
} from '../../../../store';

@Component({
  selector: 'app-administrador-tabela-area-interesse',
  templateUrl: './administrador-tabela-area-interesse.component.html',
  styleUrls: ['./administrador-tabela-area-interesse.component.css']
})
export class AdministradorTabelaAreaInteresseComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'data-postagem', 'acao'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  areaInteresseManySubscription$: Subscription = new Subscription();
  areaInteresseMany$: Observable<AreaInteresseModel[]> = new Observable<AreaInteresseModel[]>();
  areaInteresseMany: AreaInteresseModel[] = [];

  constructor(
    public router: Router,
    public store: Store,
    private dialog: MatDialog,
  ) {}

  public ngOnInit() {
    this.setupAreaInteresse();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.areaInteresseManySubscription$.unsubscribe();
  }

  setupAreaInteresse() {
    this.areaInteresseMany$ = this.store.select(getManyAreaInteresse);
    this.areaInteresseManySubscription$ = this.areaInteresseMany$.subscribe(itens => {
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
