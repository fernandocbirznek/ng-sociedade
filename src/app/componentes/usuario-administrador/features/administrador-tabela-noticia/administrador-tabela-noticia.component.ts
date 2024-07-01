import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  EditarNoticiaComponent,
  ModalExcluirComponent, 
  NovaNoticiaComponent,
  VisualizarNoticiaComponent
} from 'src/app/componentes';

import { 
  AreaInteresseModel, 
  NoticiaModel,
  UsuarioModel
} from 'src/app/models';

import { 
  excluirNoticia,
  getManyAreaInteresse,
  getManyNoticia, 
} from 'src/app/store';

@Component({
  selector: 'app-administrador-tabela-noticia',
  templateUrl: './administrador-tabela-noticia.component.html',
  styleUrls: ['./administrador-tabela-noticia.component.css']
})
export class AdministradorTabelaNoticiaComponent implements OnInit {
  @Input() usuarioLogado: UsuarioModel | undefined = undefined;

  displayedColumns: string[] = ['titulo', 'resumo', 'data-postagem', 'areaInteresse', 'acao'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  noticiaManySubscription$: Subscription = new Subscription();
  noticiaMany$: Observable<NoticiaModel[]> = new Observable<NoticiaModel[]>();

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
    this.setupProfessorNoticia();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.areaInteresseManySubscription$.unsubscribe();
    this.noticiaManySubscription$.unsubscribe();
  }

  setupAreaInteresse() {
    this.areaInteresseMany$ = this.store.select(getManyAreaInteresse);
    this.areaInteresseManySubscription$ = this.areaInteresseMany$.subscribe(itens => {
      this.areaInteresseMany = itens;
    });
  }

  setupProfessorNoticia() {
    this.noticiaMany$ = this.store.select(getManyNoticia);
    this.noticiaManySubscription$ = this.noticiaMany$.subscribe(itens => {
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

  criarNoticia() {
    this.dialog.open(NovaNoticiaComponent);
  }

  acessarNoticia(item: NoticiaModel) {
    this.dialog.open(VisualizarNoticiaComponent, {
      data: item.id,
      width: '90%',
      height: 'auto',
    });
  }

  editarNoticia(item: NoticiaModel) {
    this.dialog.open(EditarNoticiaComponent, {
     data: item
    });
  }

  excluirNoticia(item: NoticiaModel) {
    this.dialog.open(ModalExcluirComponent, {
      data: `Noticia: ${item.titulo}`
    }).afterClosed().subscribe((evento) => {
      if(evento) {
        this.store.dispatch(excluirNoticia({ noticiaId: item }));
      }
    });
  }

}
