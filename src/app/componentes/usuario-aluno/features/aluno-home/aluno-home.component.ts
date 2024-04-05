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
  selector: 'app-aluno-home',
  templateUrl: './aluno-home.component.html',
  styleUrls: ['./aluno-home.component.css']
})
export class AlunoHomeComponent implements OnInit {

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel> = new Observable<UsuarioModel>();
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
