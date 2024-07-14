import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  ModalExcluirComponent, 
  NovaAulaComponent
} from 'src/app/componentes';

import { 
  AreaFisicaModel,
  AulaModel, 
  AulaViewModel
} from 'src/app/models';

import { 
  alterarTituloPagina,
  atualizarAulaPublicado,
  excluirAula,
  getManyAreaFisica,
  getManyAulaByProfessorId, 
} from 'src/app/store';


@Component({
  selector: 'app-professor-tabela-aula',
  templateUrl: './professor-tabela-aula.component.html',
  styleUrls: ['./professor-tabela-aula.component.css']
})
export class ProfessorTabelaAulaComponent implements OnInit, AfterViewInit {
  @Input() professorId: number = 0;

  displayedColumns: string[] = ['titulo', 'resumo', 'areaFisica', 'data-postagem', 'comentarios', 'curtido', 'favoritado', 'publicado', 'acao'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  aulaManySubscription$: Subscription = new Subscription();
  aulaMany$: Observable<AulaModel[]> = new Observable<AulaModel[]>();

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
    this.setupProfessorAula();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.aulaManySubscription$.unsubscribe();
  }

  setupAreaFisica() {
    this.areaFisicaMany$ = this.store.select(getManyAreaFisica);
    this.areaFisicaManySubscription$ = this.areaFisicaMany$.subscribe(itens => {
      this.areaFisicaMany = itens;
    });
  }

  setupProfessorAula() {
    this.aulaMany$ = this.store.select(getManyAulaByProfessorId(this.professorId));
    this.aulaManySubscription$ = this.aulaMany$.subscribe(itens => {
      this.dataSource = new MatTableDataSource(itens);
    });
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  criarAula() {
    this.dialog.open(NovaAulaComponent);
  }

  acessarAula(item: AulaModel) {
    this.store.dispatch(alterarTituloPagina({ titulo: `${item.titulo}`, areaFisicaId: item.areaFisicaId }));
    this.router.navigate([`visualizar-aula/${item.id}`]);
  }

  editarAula(item: AulaModel) {
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

  publicar(item: AulaModel, check: MatSlideToggleChange ) {
    let request: AulaViewModel = new AulaViewModel();
    request.id = item.id;
    request.publicado = check.checked;

    this.store.dispatch(atualizarAulaPublicado({ aula: request }));
  }
}
