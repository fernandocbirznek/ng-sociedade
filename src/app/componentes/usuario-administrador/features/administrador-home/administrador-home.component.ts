import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  ProfessorEditarPerfilComponent 
} from 'src/app/componentes';

import { 
  UsuarioModel 
} from 'src/app/models';

import { 
  getOneUsuarioLogado, 
  selecionarManyAula, 
  selecionarManyNoticia, 
  selecionarManyUsuario
} from 'src/app/store';

@Component({
  selector: 'app-administrador-home',
  templateUrl: './administrador-home.component.html',
  styleUrls: ['./administrador-home.component.css']
})
export class AdministradorHomeComponent implements OnInit {

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel> = new Observable<UsuarioModel>();
  usuarioLogado: UsuarioModel | undefined = undefined ;

  constructor(
    private dialog: MatDialog,
    public store: Store,
  ) {
    this.store.dispatch(selecionarManyAula());
    this.store.dispatch(selecionarManyNoticia());
    this.store.dispatch(selecionarManyUsuario());
  }

  ngOnInit(): void {
    this.setupUsuarioLogado();
  }

  ngOnDestroy() {
    this.usuarioLogadoSubscription$.unsubscribe();
  }

  setupUsuarioLogado() {
    this.usuarioLogado$ = this.store.select(getOneUsuarioLogado);
    this.usuarioLogadoSubscription$ = this.usuarioLogado$.subscribe(item => {
      if(item) {
        this.usuarioLogado = item;
      }  
    });
  }

  editarPerfil() {
    this.dialog.open(ProfessorEditarPerfilComponent, {
      data: this.usuarioLogado
    });
  }
}
