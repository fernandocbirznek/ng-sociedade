import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AdministradorAlterarUsuarioComponent,
  AdministradorModalCriarUsuarioComponent,
  ModalExcluirComponent,
  ProfessorPerfilVisualizarComponent, 
} from 'src/app/componentes';

import { 
  TipoUsuarioEnum, 
  UsuarioModel
} from 'src/app/models';

import { 
  excluirUsuario,
  getManyUsuarioByTipoUsuario,
} from 'src/app/store';

@Component({
  selector: 'app-administrador-tabela-professor',
  templateUrl: './administrador-tabela-professor.component.html',
  styleUrls: ['./administrador-tabela-professor.component.css']
})
export class AdministradorTabelaProfessorComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'email', 'areaInteresse', 'dataCadastro', 'acao'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  professorManySubscription$: Subscription = new Subscription();
  professorMany$: Observable<UsuarioModel[]> = new Observable<UsuarioModel[]>();

  constructor(
    public router: Router,
    public store: Store,
    private dialog: MatDialog,
  ) {}

  public ngOnInit() {
    this.setupProfessor();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.professorManySubscription$.unsubscribe();
  }

  setupProfessor() {
    this.professorMany$ = this.store.select(getManyUsuarioByTipoUsuario(TipoUsuarioEnum.UsuarioProfessor));
    this.professorManySubscription$ = this.professorMany$.subscribe(itens => {
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

  criarUsuario() {
    this.dialog.open(AdministradorModalCriarUsuarioComponent, {
      maxHeight: '800px',
      width: '600px',
      height: 'auto',
    });
  }

  editarUsuario(item: UsuarioModel) {
    this.dialog.open(AdministradorAlterarUsuarioComponent, {
      data: item,
      width: '600px'
    });
  }

  visualizarUsuario(item: UsuarioModel) {
    this.dialog.open(ProfessorPerfilVisualizarComponent, {
      data: item.id,
      width: '80%',
      height: 'auto',
    });
  }

  excluirUsuario(item: UsuarioModel) {
    this.dialog.open(ModalExcluirComponent, {
      data: `Usuario: ${item.nome}`
    }).afterClosed().subscribe((evento) => {
      if(evento) {
        this.store.dispatch(excluirUsuario({ usuarioId: item.id }));
      }
    });
  }
}
