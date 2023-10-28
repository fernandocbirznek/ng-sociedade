import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CriarConta, Login } from 'src/app/models';

import { 
  criarConta, 
  loginConta, 
  selecionarManipularConta 
} from 'src/app/store';

@Component({
  selector: 'app-login-criar-conta',
  templateUrl: './login-criar-conta.component.html',
  styleUrls: ['./login-criar-conta.component.css']
})
export class LoginCriarContaComponent implements OnInit {

  formLogin: FormGroup = null as any;

  email = new FormControl('', [Validators.required]);
  senha = new FormControl('', [Validators.required]);

  criarConta$: Observable<any>;
  mensagemConta: string = "";

  isTelaCriarConta = false;
  hide = true;

  constructor(
    public dialogRef: MatDialogRef<LoginCriarContaComponent>,
    public store: Store,
  ) { 
    this.criarConta$ = this.store.select(selecionarManipularConta);
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
  }

  requestCriarConta(formCriarConta: CriarConta) {
    if(formCriarConta) {
      this.store.dispatch(criarConta({ conta: formCriarConta }));
      this.dialogRef.close();
    } else
      this.isTelaCriarConta = !this.isTelaCriarConta;
  }

  fecharModal() {
    this.dialogRef.close();
  }

}
