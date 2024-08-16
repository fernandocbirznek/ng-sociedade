import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  InserirForumTagComponent,
  ModalExcluirComponent, 
} from 'src/app/componentes';

import { 
  ForumTagModel,
} from 'src/app/models';

import { 
  excluirForumTag,
  getManyForumTag,
} from 'src/app/store';

@Component({
  selector: 'app-administrador-tabela-forum-tag',
  templateUrl: './administrador-tabela-forum-tag.component.html',
  styleUrls: ['./administrador-tabela-forum-tag.component.css']
})
export class AdministradorTabelaForumTagComponent implements OnInit {

  displayedColumns: string[] = ['titulo', 'data-postagem', 'acao'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  forumTagManySubscription$: Subscription = new Subscription();
  forumTagMany$: Observable<ForumTagModel[]> = new Observable<ForumTagModel[]>();
  forumTagMany: ForumTagModel[] = [];

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
    this.forumTagManySubscription$.unsubscribe();
  }

  setupAreaInteresse() {
    this.forumTagMany$ = this.store.select(getManyForumTag);
    this.forumTagManySubscription$ = this.forumTagMany$.subscribe(itens => {
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

  criarForumTag() {
    this.dialog.open(InserirForumTagComponent, {
      maxHeight: '800px',
      width: '500px',
      height: 'auto',
    });
  }

  excluirForumTag(item: ForumTagModel) {
    this.dialog.open(ModalExcluirComponent, {
      data: `Fórum tag: ${item.titulo}`
    }).afterClosed().subscribe((evento) => {
      if(evento) {
        this.store.dispatch(excluirForumTag({ forumTagId: item.id }));
      }
    });
  }
}
