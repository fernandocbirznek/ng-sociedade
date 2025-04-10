import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { 
  AreaInteresseModel,
} from '../../../../models';

import { 
  inserirAreaInteresse,
} from '../../../../store';

@Component({
  selector: 'app-inserir-area-interesse',
  templateUrl: './inserir-area-interesse.component.html',
  styleUrls: ['./inserir-area-interesse.component.css']
})
export class InserirAreaInteresseComponent implements OnInit {

  formGroupAreaInteresse: FormGroup = null as any;

  formNome = new FormControl('', [Validators.required, Validators.maxLength(50)]);

  constructor(
    public dialogRef: MatDialogRef<InserirAreaInteresseComponent>,
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario() {
    this.formGroupAreaInteresse = new FormGroup({
      formNome: this.formNome,
    });
  }

  requestCriarAreaInteresse() {
    let request: AreaInteresseModel = AreaInteresseModel.create({
      nome: this.formGroupAreaInteresse.get("formNome")?.value
    });
 
    this.formGroupAreaInteresse.reset();
    this.store.dispatch(inserirAreaInteresse({ areaInteresse: request }))
    this.dialogRef.close();
  }

  fecharModal() {
    this.dialogRef.close();
  }
}
