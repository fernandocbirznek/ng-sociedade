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
  getOneUsuarioLogado 
} from 'src/app/store';

@Component({
  selector: 'app-professor-home',
  templateUrl: './professor-home.component.html',
  styleUrls: ['./professor-home.component.css']
})
export class ProfessorHomeComponent implements OnInit {

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel | undefined> = new Observable<UsuarioModel | undefined>();
  usuarioLogado: UsuarioModel | undefined = undefined ;

  constructor(
    private dialog: MatDialog,
    public store: Store,
  ) { }

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
