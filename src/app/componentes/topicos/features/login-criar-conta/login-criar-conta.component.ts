import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { 
  CriarContaPerfilModel, 
  Login 
} from '../../../../models';

import { 
  criarConta, 
  loginConta, 
  getOneUsuarioLogado 
} from '../../../../store';

@Component({
  selector: 'app-login-criar-conta',
  templateUrl: './login-criar-conta.component.html',
  styleUrls: ['./login-criar-conta.component.css']
})
export class LoginCriarContaComponent implements OnInit {

  formLogin: FormGroup = null as any;

  email = new FormControl('', [Validators.required]);
  senha = new FormControl('', [Validators.required]);

  criarPerfil: CriarContaPerfilModel = CriarContaPerfilModel.create({});

  usuarioLogado$: Observable<any>;
  mensagemConta: string = "";

  isTelaCriarConta = false;
  hide = true;

  constructor(
    public dialogRef: MatDialogRef<LoginCriarContaComponent>,
    public store: Store,
  ) { 
    this.usuarioLogado$ = this.store.select(getOneUsuarioLogado);
  }

  ngOnInit(): void {
    this.criarFormularioLogin();
  }

  criarFormularioLogin() {
    this.formLogin = new FormGroup({
      email: this.email,
      senha: this.senha
    })
  }

  telaCriarConta() {
    this.isTelaCriarConta = !this.isTelaCriarConta;
  }


  logarPerfil() {
    let login: Login = new Login();
    login.email = this.formLogin.get("email")?.value;
    login.senha = this.formLogin.get("senha")?.value;
    this.store.dispatch(loginConta({ login: login }));
    this.dialogRef.close();
  }

  requestCriarConta(formCriarConta: CriarContaPerfilModel) {
    if(formCriarConta) {
      this.criarPerfil.email = formCriarConta.email;
      this.criarPerfil.nome = formCriarConta.nome;
      this.criarPerfil.senha = formCriarConta.senha;

      this.store.dispatch(criarConta({ conta: this.criarPerfil }));
      this.dialogRef.close();
    } else
      this.isTelaCriarConta = !this.isTelaCriarConta;
  }

  requestCriarPerfil(formCriarPerfil: CriarContaPerfilModel) {
    this.criarPerfil.foto = formCriarPerfil.foto;
    this.criarPerfil.hobbie = formCriarPerfil.hobbie;
    this.criarPerfil.dataNascimento = formCriarPerfil.dataNascimento;
  }

  fecharModal() {
    this.dialogRef.close();
  }

}
