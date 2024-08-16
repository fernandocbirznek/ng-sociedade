import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';

import { 
  AreaInteresseModel,
} from 'src/app/models';

import { 
  inserirAreaInteresse,
} from 'src/app/store';

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
    let request: AreaInteresseModel = new AreaInteresseModel();
    request.nome = this.formGroupAreaInteresse.get("formNome")?.value;
 
    this.formGroupAreaInteresse.reset();
    this.store.dispatch(inserirAreaInteresse({ areaInteresse: request }))
    this.dialogRef.close();
  }

  fecharModal() {
    this.dialogRef.close();
  }
}
