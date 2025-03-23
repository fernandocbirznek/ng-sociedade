import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { 
  ForumModel,
} from '../../../../models';

import { 
  inserirForum,
} from '../../../../store';

@Component({
  selector: 'app-inserir-forum',
  templateUrl: './inserir-forum.component.html',
  styleUrls: ['./inserir-forum.component.css']
})
export class InserirForumComponent implements OnInit {

  formGroupForum: FormGroup = null as any;

  formTitulo = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  formDescricao = new FormControl('', [Validators.required, Validators.maxLength(150)]);

  constructor(
    public dialogRef: MatDialogRef<InserirForumComponent>,
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario() {
    this.formGroupForum = new FormGroup({
      formTitulo: this.formTitulo,
      formDescricao: this.formDescricao,
    });
  }

  requestCriarForum() {
    let request: ForumModel = ForumModel.create({
      titulo: this.formGroupForum.get("formTitulo")?.value,
      descricao: this.formGroupForum.get("formDescricao")?.value
    });
 
    this.formGroupForum.reset();
    this.store.dispatch(inserirForum({ forum: request }))
    this.dialogRef.close();
  }

  fecharModal() {
    this.dialogRef.close();
  }

}
