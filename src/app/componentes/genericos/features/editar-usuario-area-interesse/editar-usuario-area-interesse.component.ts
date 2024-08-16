import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AreaInteresseModel, 
  UsuarioAreaInteresseModel, 
  UsuarioModel 
} from 'src/app/models';

import { 
  getManyAreaInteresse, 
  inserirUsuarioAreaInteresse, 
  removerUsuarioAreaInteresse 
} from 'src/app/store';

@Component({
  selector: 'app-editar-usuario-area-interesse',
  templateUrl: './editar-usuario-area-interesse.component.html',
  styleUrls: ['./editar-usuario-area-interesse.component.css']
})
export class EditarUsuarioAreaInteresseComponent implements OnInit {

  areaInteresseManySubscription$: Subscription = new Subscription();
  areaInteresseMany$: Observable<AreaInteresseModel[]> = new Observable<AreaInteresseModel[]>();
  areaInteresseMany: AreaInteresseModel[] = [];

  areaInteresseSelecionado: AreaInteresseModel[] = [];
  selecionado: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditarUsuarioAreaInteresseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UsuarioModel,
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.setupAreaInteresse();
    this.setupAreaInteresseSelecionado();
  }

  ngOnDestroy() {
    this.areaInteresseManySubscription$.unsubscribe();
  }

  setupAreaInteresse() {
    this.areaInteresseMany$ = this.store.select(getManyAreaInteresse);
    this.areaInteresseManySubscription$ = this.areaInteresseMany$.subscribe(itens => {
      this.areaInteresseMany = itens;
    });
  }

  setupAreaInteresseSelecionado() {
    this.data.usuarioAreaInteresses.forEach(item => {
      this.areaInteresseSelecionado.push(item);
      this.selecionado.push(item.id);
    })
  }

  requestUsuarioAreaInteresse() {
    this.areaInteresseSelecionado.forEach(item => {
      if (!this.data.usuarioAreaInteresses.find(areaInteresse => areaInteresse.id == item.id)) {
        let usuarioAreaInteresse: UsuarioAreaInteresseModel = new UsuarioAreaInteresseModel();
        usuarioAreaInteresse.usuarioId = this.data.id;
        usuarioAreaInteresse.areaInteresseId = item.id;

        this.store.dispatch(inserirUsuarioAreaInteresse({ usuarioAreaInteresse: usuarioAreaInteresse }));
      }
    })

    this.data.usuarioAreaInteresses.forEach(item => {
      if (!this.areaInteresseSelecionado.find(selecionado => selecionado.id == item.id)) {
        let usuarioAreaInteresse: UsuarioAreaInteresseModel = new UsuarioAreaInteresseModel();
        usuarioAreaInteresse.usuarioId = this.data.id;
        usuarioAreaInteresse.areaInteresseId = item.id;

        this.store.dispatch(removerUsuarioAreaInteresse({ usuarioAreaInteresse: usuarioAreaInteresse }));
      }
    })

    this.dialogRef.close(this.areaInteresseSelecionado);
  }

  fecharModal() {
    this.dialogRef.close(undefined);
  }

  selecionouAreaInteresse(areaInteresse: AreaInteresseModel, check: any) {
    let areaInteresseSelecionado = this.areaInteresseSelecionado.find(item => item.id == areaInteresse.id);

    if (check.checked && !areaInteresseSelecionado) {
      this.selecionado.push(areaInteresse.id);
      this.areaInteresseSelecionado.push(areaInteresse);
    }
      
    if (!check.checked && areaInteresseSelecionado) {
      this.selecionado = this.selecionado.filter(item => item != areaInteresse.id);
      this.areaInteresseSelecionado = this.areaInteresseSelecionado.filter(item => item.id != areaInteresse.id);
    }
  }
}
