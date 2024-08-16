import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';

import { 
  AulaComentarioModel, 
  UsuarioModel
} from 'src/app/models';

import { 
  atualizarAulaComentario 
} from 'src/app/store';

@Component({
  selector: 'app-editar-aula-comentario',
  templateUrl: './editar-aula-comentario.component.html',
  styleUrls: ['./editar-aula-comentario.component.css']
})
export class EditarAulaComentarioComponent implements OnInit {

  formComentario: FormGroup = null as any;
  formControlComentario = new FormControl('', [Validators.required, Validators.maxLength(2000)]);

  constructor(
    public store: Store,
    public dialogRef: MatDialogRef<EditarAulaComentarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {aulaComentario: AulaComentarioModel, usuarioLogado: UsuarioModel },
  ) { 
    this.criarFormularioComentario();
  }

  ngOnInit(): void {
    this.setupFormulario();
  }

  private criarFormularioComentario() {
    this.formComentario = new FormGroup({
      comentario: this.formControlComentario,
    })
  }

  setupFormulario() {
    this.formComentario.get("comentario")!.setValue(this.data.aulaComentario.descricao);
  }

  editarComentario() {
    let aulaComentario: AulaComentarioModel = new AulaComentarioModel();
    aulaComentario.id = this.data.aulaComentario.id;
    aulaComentario.aulaId = this.data.aulaComentario.aulaId;
    aulaComentario.usuarioId = this.data.usuarioLogado.id;
    aulaComentario.descricao = this.formComentario.get("comentario")?.value;
    this.store.dispatch(atualizarAulaComentario({ aulaComentario: aulaComentario }));
    this.dialogRef.close();
  }

  alterouFormEditor(item: string) {
    this.formControlComentario.setValue(item);
  }

  cancelar() {
    this.dialogRef.close();
  }

}
