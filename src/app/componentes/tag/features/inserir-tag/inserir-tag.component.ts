import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { 
  TagModel 
} from '../../../../models';

import { 
  inserirTag 
} from '../../../../store';

@Component({
  selector: 'app-inserir-tag',
  templateUrl: './inserir-tag.component.html',
  styleUrls: ['./inserir-tag.component.css']
})
export class InserirTagComponent implements OnInit {

  formGroupTag: FormGroup = null as any;

  formNome = new FormControl('', [Validators.required, Validators.maxLength(50)]);

  constructor(
    public dialogRef: MatDialogRef<InserirTagComponent>,
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario() {
    this.formGroupTag = new FormGroup({
      formNome: this.formNome,
    });
  }

  requestCriarTag() {
    let request: TagModel = TagModel.create({
      nome: this.formGroupTag.get("formNome")?.value
    });
 
    this.formGroupTag.reset();
    this.store.dispatch(inserirTag({ tag: request }))
    this.dialogRef.close();
  }

  fecharModal() {
    this.dialogRef.close();
  }
}
