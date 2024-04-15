import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CriarContaPerfilModel } from 'src/app/models';
import { criarConta } from 'src/app/store';

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
    this.store.dispatch(criarConta({ conta: formCriarConta }));
    this.dialogRef.close();
  }
}
