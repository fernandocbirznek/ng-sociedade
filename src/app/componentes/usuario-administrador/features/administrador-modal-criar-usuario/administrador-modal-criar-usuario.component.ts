import { Component, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import { CriarContaPerfilModel } from 'src/app/models';
import { criarUsuario } from 'src/app/store';

@Component({
  selector: 'app-administrador-modal-criar-usuario',
  templateUrl: './administrador-modal-criar-usuario.component.html',
  styleUrls: ['./administrador-modal-criar-usuario.component.css']
})
export class AdministradorModalCriarUsuarioComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AdministradorModalCriarUsuarioComponent>,
    public store: Store,
  ) { }

  ngOnInit(): void {
  }

  requestCriarConta(formCriarConta: CriarContaPerfilModel) {
    this.store.dispatch(criarUsuario({ conta: formCriarConta }));
    this.dialogRef.close();
  }
}
