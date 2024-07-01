import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AtualizarForumComponent,
  InserirForumComponent,
  ModalExcluirComponent, 
} from 'src/app/componentes';

import { 
  ForumModel,
} from 'src/app/models';

import { 
  excluirForum,
  getManyForum,
} from 'src/app/store';

@Component({
  selector: 'app-administrador-tabela-forum',
  templateUrl: './administrador-tabela-forum.component.html',
  styleUrls: ['./administrador-tabela-forum.component.css']
})
export class AdministradorTabelaForumComponent implements OnInit {

  displayedColumns: string[] = ['titulo', 'descricao', 'data-postagem', 'acao'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  forumManySubscription$: Subscription = new Subscription();
  forumMany$: Observable<ForumModel[]> = new Observable<ForumModel[]>();
  forumMany: ForumModel[] = [];

  constructor(
    public router: Router,
    public store: Store,
    private dialog: MatDialog,
  ) {}

  public ngOnInit() {
    this.setupForum();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.forumManySubscription$.unsubscribe();
  }

  setupForum() {
    this.forumMany$ = this.store.select(getManyForum);
    this.forumManySubscription$ = this.forumMany$.subscribe(itens => {
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

  criarForum() {
    this.dialog.open(InserirForumComponent, {
      maxHeight: '800px',
      width: '500px',
      height: 'auto',
    });
  }

  editarForum(item: ForumModel) {
    this.dialog.open(AtualizarForumComponent, {
      data: item,
      width: '600px'
    });
  }

  excluirForum(item: ForumModel) {
    this.dialog.open(ModalExcluirComponent, {
      data: `Fórum: ${item.titulo}`
    }).afterClosed().subscribe((evento) => {
      if(evento) {
        this.store.dispatch(excluirForum({ forumId: item.id }));
      }
    });
  }
}
