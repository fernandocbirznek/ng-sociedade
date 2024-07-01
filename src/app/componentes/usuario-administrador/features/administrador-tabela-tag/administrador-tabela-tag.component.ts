import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  InserirTagComponent,
  ModalExcluirComponent, 
} from 'src/app/componentes';

import { 
  TagModel,
} from 'src/app/models';

import { 
  excluirTag,
  getManyTag,
} from 'src/app/store';

@Component({
  selector: 'app-administrador-tabela-tag',
  templateUrl: './administrador-tabela-tag.component.html',
  styleUrls: ['./administrador-tabela-tag.component.css']
})
export class AdministradorTabelaTagComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'data-postagem', 'acao'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  tagManySubscription$: Subscription = new Subscription();
  tagMany$: Observable<TagModel[]> = new Observable<TagModel[]>();
  tagMany: TagModel[] = [];

  constructor(
    public router: Router,
    public store: Store,
    private dialog: MatDialog,
  ) {}

  public ngOnInit() {
    this.setupTag();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.tagManySubscription$.unsubscribe();
  }

  setupTag() {
    this.tagMany$ = this.store.select(getManyTag);
    this.tagManySubscription$ = this.tagMany$.subscribe(itens => {
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
