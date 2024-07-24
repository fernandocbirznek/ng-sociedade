import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { 
  AreaFisicaModel 
} from 'src/app/models';

import { 
  atualizarAreaFisica 
} from 'src/app/store';

@Component({
  selector: 'app-atualizar-area-fisica',
  templateUrl: './atualizar-area-fisica.component.html',
  styleUrls: ['./atualizar-area-fisica.component.css']
})
export class AtualizarAreaFisicaComponent implements OnInit {

  formGroupAreaFisica: FormGroup = null as any;

  formTitulo = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  formDescricao = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  formAplicacao = new FormControl('', [Validators.required, Validators.maxLength(200)]);

  isButtonDisabled: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AreaFisicaModel,
    public dialogRef: MatDialogRef<AtualizarAreaFisicaComponent>,
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.setupFormulario();
  }

  criarFormulario() {
    this.formGroupAreaFisica = new FormGroup({
      formTitulo: this.formTitulo,
      formDescricao: this.formDescricao,
      formAplicacao: this.formAplicacao
    });
  }

  setupFormulario() {
    this.formGroupAreaFisica.get("formTitulo")!.setValue(this.data.titulo);
    this.formGroupAreaFisica.get("formDescricao")!.setValue(this.data.descricao);
    this.formGroupAreaFisica.get("formAplicacao")!.setValue(this.data.aplicacao);
  }

  requestAtualizarAreaFisica() {
    let request: AreaFisicaModel = new AreaFisicaModel();
    request.id = this.data.id;
    request.titulo = this.formGroupAreaFisica.get("formTitulo")?.value;
    request.descricao = this.formGroupAreaFisica.get("formDescricao")?.value;
    request.aplicacao = this.formGroupAreaFisica.get("formAplicacao")?.value;
 
    this.formGroupAreaFisica.reset();
    this.store.dispatch(atualizarAreaFisica({ areaFisica: request }))
    this.dialogRef.close();
  }

  fecharModal() {
    this.dialogRef.close();
  }
}
