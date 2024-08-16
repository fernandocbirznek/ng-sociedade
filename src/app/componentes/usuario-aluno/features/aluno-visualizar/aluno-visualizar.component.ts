import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

import { 
  UsuarioModel 
} from 'src/app/models';

@Component({
  selector: 'app-aluno-visualizar',
  templateUrl: './aluno-visualizar.component.html',
  styleUrls: ['./aluno-visualizar.component.css']
})
export class AlunoVisualizarComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UsuarioModel,
    public dialogRef: MatDialogRef<AlunoVisualizarComponent>,
  ) { }

  ngOnInit(): void {}

  fecharModal() {
    this.dialogRef.close();
  }
}
