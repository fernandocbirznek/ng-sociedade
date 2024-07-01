import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { 
  ForumModel,
} from 'src/app/models';

import { 
  atualizarForum,
} from 'src/app/store';

@Component({
  selector: 'app-atualizar-forum',
  templateUrl: './atualizar-forum.component.html',
  styleUrls: ['./atualizar-forum.component.css']
})
export class AtualizarForumComponent implements OnInit {

  formGroupForum: FormGroup = null as any;

  formTitulo = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  formDescricao = new FormControl('', [Validators.required, Validators.maxLength(150)]);

  constructor(
    public dialogRef: MatDialogRef<AtualizarForumComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ForumModel,
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.setupFormulario();
  }

  criarFormulario() {
    this.formGroupForum = new FormGroup({
      formTitulo: this.formTitulo,
      formDescricao: this.formDescricao,
    });
  }

  setupFormulario() {
    this.formGroupForum.get("formTitulo")!.setValue(this.data?.titulo);
    this.formGroupForum.get("formDescricao")!.setValue(this.data?.descricao);
  }

  requestCriarForum() {
    let request: ForumModel = new ForumModel();
    request.id = this.data.id;
    request.titulo = this.formGroupForum.get("formTitulo")?.value;
    request.descricao = this.formGroupForum.get("formDescricao")?.value;
 
    this.formGroupForum.reset();
    this.store.dispatch(atualizarForum({ forum: request }))
    this.dialogRef.close();
  }

  fecharModal() {
    this.dialogRef.close();
  }

}
