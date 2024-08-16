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
  AlunoVisualizarComponent,
  ModalExcluirComponent, 
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
  selector: 'app-administrador-tabela-administrador',
  templateUrl: './administrador-tabela-administrador.component.html',
  styleUrls: ['./administrador-tabela-administrador.component.css']
})
export class AdministradorTabelaAdministradorComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'email', 'dataCadastro', 'acao'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  alunoManySubscription$: Subscription = new Subscription();
  alunoMany$: Observable<UsuarioModel[]> = new Observable<UsuarioModel[]>();

  constructor(
    public router: Router,
    public store: Store,
    private dialog: MatDialog,
  ) {}

  public ngOnInit() {
    this.setupAluno();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.alunoManySubscription$.unsubscribe();
  }

  setupAluno() {
    this.alunoMany$ = this.store.select(getManyUsuarioByTipoUsuario(TipoUsuarioEnum.UsuarioAdministrador));
    this.alunoManySubscription$ = this.alunoMany$.subscribe(itens => {
      this.dataSource.data =itens;
    });
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editarUsuario(item: UsuarioModel) {
    this.dialog.open(AdministradorAlterarUsuarioComponent, {
      data: item,
      width: '600px'
    });
  }

  visualizarUsuario(item: UsuarioModel) {
    //TODO, criar um visualizar perfil administrador
    this.dialog.open(AlunoVisualizarComponent, {
      data: item,
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
