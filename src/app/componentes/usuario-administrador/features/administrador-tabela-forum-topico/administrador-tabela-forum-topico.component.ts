import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { ModalExcluirComponent } from 'src/app/componentes';

import { 
  ForumTopicoModel,
  ForumTopicoViewModel,
} from 'src/app/models';

import { 
  adicionarRota,
  excluirForumTopico,
  getManyForumTopico,
} from 'src/app/store';

@Component({
  selector: 'app-administrador-tabela-forum-topico',
  templateUrl: './administrador-tabela-forum-topico.component.html',
  styleUrls: ['./administrador-tabela-forum-topico.component.css']
})
export class AdministradorTabelaForumTopicoComponent implements OnInit {

  displayedColumns: string[] = ['titulo', 'forumTopicoEnum', 'usuarioCadastro', 'data-postagem', 'acao'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  forumTopicoManySubscription$: Subscription = new Subscription();
  forumTopicoMany$: Observable<ForumTopicoViewModel[]> = new Observable<ForumTopicoViewModel[]>();
  forumTopicoMany: ForumTopicoViewModel[] = [];

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

  visualizarForumTopico(item: ForumTopicoModel) {
    this.router.navigate([`forum/${item.forumId}/forum-topico/${item.id}`]);
    this.store.dispatch(adicionarRota({ 
      rota: {
        rotaNome: `fórum tópico`, 
        rotaAcessar: `forum/${item.forumId}/forum-topico/${item.id}`,
        rotaNivel: 2
      } 
    }));
  }

  excluirForumTopico(item: ForumTopicoModel) {
    this.dialog.open(ModalExcluirComponent, {
      data: `Fórum tópico: ${item.titulo}`
    }).afterClosed().subscribe((evento) => {
      if(evento) {
        this.store.dispatch(excluirForumTopico({ forumTopicoId: item.id }));
      }
    });
  }

}
