import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { 
  TipoUsuarioEnum, 
  UsuarioModel
} from '../../../../models';

import { 
  atualizarUsuario 
} from '../../../../store';

@Component({
  selector: 'app-administrador-alterar-usuario',
  templateUrl: './administrador-alterar-usuario.component.html',
  styleUrls: ['./administrador-alterar-usuario.component.css']
})
export class AdministradorAlterarUsuarioComponent implements OnInit {

  formAlterarUsuario: FormGroup = null as any;

  email = new FormControl('', [Validators.required]);
  nome = new FormControl('', [Validators.required]);
  tipoUsuario: TipoUsuarioEnum = TipoUsuarioEnum.None;

  readonly tipoUsuarioEnum = TipoUsuarioEnum;

  constructor(
    public dialogRef: MatDialogRef<AdministradorAlterarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UsuarioModel,
    public store: Store,
  ) { 
  }

  ngOnInit(): void {
    this.criarFormularioLogin();
    this.setupFormulario();
  }

  criarFormularioLogin() {
    this.formAlterarUsuario = new FormGroup({
      email: this.email,
      nome: this.nome,
    })
  }

  setupFormulario() {
    this.formAlterarUsuario.get("nome")!.setValue(this.data.nome);
    this.formAlterarUsuario.get("email")!.setValue(this.data.email);
    this.tipoUsuario = this.data.tipoUsuarioEnum;
  }

  requestAlterarUsuario() {
    let request: UsuarioModel = new UsuarioModel();
    request.id = this.data.id;
    request.nome = this.formAlterarUsuario.get("nome")?.value;
    request.email = this.formAlterarUsuario.get("email")?.value;
    request.tipoUsuarioEnum = this.tipoUsuario;
    request.tipoUsuario = this.tipoUsuario;

    this.store.dispatch(atualizarUsuario({ usuario: request }));
    this.dialogRef.close();
  }

  selectedTipoUsuario(item: any) {
    this.tipoUsuario = item.value;
  }

  fecharModal() {
    this.dialogRef.close();
  }

  getTipoUsuario(item: TipoUsuarioEnum): number {
    switch (item) {
      case TipoUsuarioEnum.UsuarioComum:
        return 1;
      case TipoUsuarioEnum.UsuarioProfessor:
        return 2;
      case TipoUsuarioEnum.UsuarioProfessorAdministrador:
        return 3;
      case TipoUsuarioEnum.UsuarioAdministrador:
        return 4;
    }
    return 0;
  }
}
