import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { 
  UsuarioModel 
} from '../../../../models';

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
