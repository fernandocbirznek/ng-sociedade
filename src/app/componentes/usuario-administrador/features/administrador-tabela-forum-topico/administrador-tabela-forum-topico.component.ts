import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 

} from 'src/app/componentes';

import { 
  ForumTopicoModel,
} from 'src/app/models';

import { 
  getManyForumTopico,
  selecionarManyForumTopico,
} from 'src/app/store';

@Component({
  selector: 'app-administrador-tabela-forum-topico',
  templateUrl: './administrador-tabela-forum-topico.component.html',
  styleUrls: ['./administrador-tabela-forum-topico.component.css']
})
export class AdministradorTabelaForumTopicoComponent implements OnInit {

  displayedColumns: string[] = ['titulo', 'descricao', 'forumTopicoEnum', 'usuarioCadastro', 'data-postagem', 'acao'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  forumTopicoManySubscription$: Subscription = new Subscription();
  forumTopicoMany$: Observable<ForumTopicoModel[]> = new Observable<ForumTopicoModel[]>();
  forumTopicoMany: ForumTopicoModel[] = [];

  constructor(
    public router: Router,
    public store: Store,
    private dialog: MatDialog,
  ) {}

  public ngOnInit() {
    this.setupForumTopico();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.forumTopicoManySubscription$.unsubscribe();
  }

  setupForumTopico() {
    this.store.dispatch(selecionarManyForumTopico());
    this.forumTopicoMany$ = this.store.select(getManyForumTopico);
    this.forumTopicoManySubscription$ = this.forumTopicoMany$.subscribe(itens => {
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

  criarForumTopico() {
    // this.dialog.open(InserirForumComponent, {
    //   maxHeight: '800px',
    //   width: '500px',
    //   height: 'auto',
    // });
  }

  editarForumTopico(item: ForumTopicoModel) {
    // this.dialog.open(AtualizarForumComponent, {
    //   data: item,
    //   width: '600px'
    // });
  }

  excluirForumTopico(item: ForumTopicoModel) {
    // this.dialog.open(ModalExcluirComponent, {
    //   data: `Fórum: ${item.titulo}`
    // }).afterClosed().subscribe((evento) => {
    //   if(evento) {
    //     this.store.dispatch(excluirForum({ forumId: item.id }));
    //   }
    // });
  }

}
