import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { 
  AreaFisicaModel 
} from 'src/app/models';

import { 
  inserirAreaFisica 
} from 'src/app/store';

@Component({
  selector: 'app-inserir-area-fisica',
  templateUrl: './inserir-area-fisica.component.html',
  styleUrls: ['./inserir-area-fisica.component.css']
})
export class InserirAreaFisicaComponent implements OnInit {

  formGroupAreaFisica: FormGroup = null as any;

  formTitulo = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  formDescricao = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  formAplicacao = new FormControl('', [Validators.required, Validators.maxLength(200)]);

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<InserirAreaFisicaComponent>,
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario() {
    this.formGroupAreaFisica = new FormGroup({
      formTitulo: this.formTitulo,
      formDescricao: this.formDescricao,
      formAplicacao: this.formAplicacao
    });
  }

  requestCriarAreaFisica() {
    let request: AreaFisicaModel = new AreaFisicaModel();
    request.titulo = this.formGroupAreaFisica.get("formTitulo")?.value;
    request.descricao = this.formGroupAreaFisica.get("formDescricao")?.value;
    request.aplicacao = this.formGroupAreaFisica.get("formAplicacao")?.value;
 
    this.formGroupAreaFisica.reset();
    this.store.dispatch(inserirAreaFisica({ areaFisica: request }))
    this.dialogRef.close();
  }

  fecharModal() {
    this.dialogRef.close();
  }
}
