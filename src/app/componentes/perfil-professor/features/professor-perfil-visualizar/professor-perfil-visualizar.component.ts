import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AulaModel,
  NoticiaModel, 
  UsuarioModel 
} from '../../../../models';

import { 
  getManyNoticiaByProfessorId, 
  getUsuarioById, 
  selecionarAreaInteresseMany, 
  selecionarNoticiaManyByProfessorId, 
  selecionarUsuarioById 
} from '../../../../store';

@Component({
  selector: 'app-professor-perfil-visualizar',
  templateUrl: './professor-perfil-visualizar.component.html',
  styleUrls: ['./professor-perfil-visualizar.component.css']
})
export class ProfessorPerfilVisualizarComponent implements OnInit {

  noticiaManyByUsuarioIdSubscription$: Subscription = new Subscription();
  noticiaManyByUsuarioId$: Observable<NoticiaModel[]> = new Observable<NoticiaModel[]>();
  noticiaManyByUsuarioId: NoticiaModel[] = [];

  usuarioSubscription$: Subscription = new Subscription();
  usuario$: Observable<UsuarioModel | undefined> = new Observable<UsuarioModel | undefined>();
  usuario: UsuarioModel | undefined = undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    public dialogRef: MatDialogRef<ProfessorPerfilVisualizarComponent>,
    public router: Router,
    public store: Store,
  ) { 
    this.store.dispatch(selecionarAreaInteresseMany());
  }

  ngOnInit(): void {
    this.setupNoticia();
    this.setupUsuario();
  }

  ngOnDestroy() {
    this.noticiaManyByUsuarioIdSubscription$.unsubscribe();
    this.usuarioSubscription$.unsubscribe();
  }

  setupNoticia() {
    this.store.dispatch(selecionarNoticiaManyByProfessorId({ professorId: this.data }));
    this.noticiaManyByUsuarioId$ = this.store.select(getManyNoticiaByProfessorId(this.data));
    this.noticiaManyByUsuarioIdSubscription$ = this.noticiaManyByUsuarioId$.subscribe(itens => {
      this.noticiaManyByUsuarioId = itens;
    });
  }

  setupUsuario() {
    this.store.dispatch(selecionarUsuarioById({ usuarioId: this.data }));
    this.usuario$ = this.store.select(getUsuarioById(this.data));
    this.usuarioSubscription$ = this.usuario$.subscribe(item => {
      if(item)
        this.usuario = item;
    });
  }

  fecharModal() {
    this.dialogRef.close();
  }

  acessarAula(aula: AulaModel) {
    this.dialogRef.close(aula);
  }
}
