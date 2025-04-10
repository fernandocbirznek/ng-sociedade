import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { 
  ForumTagModel 
} from '../../../../models';

import { 
  inserirForumTag 
} from '../../../../store';

@Component({
  selector: 'app-inserir-forum-tag',
  templateUrl: './inserir-forum-tag.component.html',
  styleUrls: ['./inserir-forum-tag.component.css']
})
export class InserirForumTagComponent implements OnInit {

  formGroupForumTag: FormGroup = null as any;

  formTitulo = new FormControl('', [Validators.required, Validators.maxLength(50)]);

  constructor(
    public dialogRef: MatDialogRef<InserirForumTagComponent>,
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario() {
    this.formGroupForumTag = new FormGroup({
      formTitulo: this.formTitulo,
    });
  }

  requestCriarForumTag() {
    let request: ForumTagModel = ForumTagModel.create({
      titulo: this.formGroupForumTag.get("formTitulo")?.value
    });
 
    this.formGroupForumTag.reset();
    this.store.dispatch(inserirForumTag({ forumTag: request }))
    this.dialogRef.close();
  }

  fecharModal() {
    this.dialogRef.close();
  }

}
