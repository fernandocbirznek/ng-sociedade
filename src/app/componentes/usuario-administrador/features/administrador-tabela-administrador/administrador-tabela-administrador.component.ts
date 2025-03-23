import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AdministradorAlterarUsuarioComponent,
  AdministradorModalCriarUsuarioComponent,
  AlunoVisualizarComponent,
  ModalExcluirComponent, 
} from '../../../../componentes';

import { 
  TabelaModel,
  TipoUsuarioEnum, 
  UsuarioModel
} from '../../../../models';

import { 
  excluirUsuario,
  getManyTabelaUsuarioByTipoUsuario
} from '../../../../store';

@Component({
  selector: 'app-administrador-tabela-administrador',
  templateUrl: './administrador-tabela-administrador.component.html',
  styleUrls: ['./administrador-tabela-administrador.component.css']
})
export class AdministradorTabelaAdministradorComponent implements OnInit {

  tabelaSubscription$: Subscription = new Subscription();
  tabela$: Observable<TabelaModel> = new Observable<TabelaModel>();
  tabela: TabelaModel = TabelaModel.create({});

  constructor(
    public router: Router,
    public store: Store,
    private dialog: MatDialog,
  ) {}

  public ngOnInit() {
    this.setupTabela();
  }

  ngOnDestroy() {
    this.tabelaSubscription$.unsubscribe();
  }

  setupTabela() {
      this.tabela$ = this.store.select(getManyTabelaUsuarioByTipoUsuario(TipoUsuarioEnum.UsuarioAdministrador));
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
