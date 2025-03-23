import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AdministradorAlterarUsuarioComponent,
  AdministradorModalCriarUsuarioComponent,
  ModalExcluirComponent,
  ProfessorPerfilVisualizarComponent, 
} from '../../../../componentes';

import { 
  TabelaModel,
  TipoUsuarioEnum, 
  UsuarioModel
} from '../../../../models';

import { 
  excluirUsuario,
  getManyTabelaUsuarioByTipoUsuario,
  getManyUsuarioByTipoUsuario,
} from '../../../../store';

@Component({
  selector: 'app-administrador-tabela-professor',
  templateUrl: './administrador-tabela-professor.component.html',
  styleUrls: ['./administrador-tabela-professor.component.css']
})
export class AdministradorTabelaProfessorComponent implements OnInit {

  tabelaSubscription$: Subscription = new Subscription();
  tabela$: Observable<TabelaModel> = new Observable<TabelaModel>();
  tabela: TabelaModel = TabelaModel.create({});

  constructor(
    public router: Router,
    public store: Store,
    private dialog: MatDialog,
  ) {}

  public ngOnInit() {
    this.setupUsuario();
  }

  ngOnDestroy() {
    this.tabelaSubscription$.unsubscribe();
  }

  setupUsuario() {
    this.tabela$ = this.store.select(getManyTabelaUsuarioByTipoUsuario(TipoUsuarioEnum.UsuarioProfessor));
      this.tabelaSubscription$ = this.tabela$.subscribe(item => {
        this.tabela = item;
      });
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
      maxHeight: '90%',
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
