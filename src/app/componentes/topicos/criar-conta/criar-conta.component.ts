import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CriarConta, Login } from 'src/app/models';
import { criarConta, loginConta, selecionarManipularConta } from 'src/app/store';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {

  formConta: FormGroup = null as any;
  formLogin: FormGroup = null as any;

  criarConta$: Observable<any>;
  mensagemConta: string = "";

  email = new FormControl('', [Validators.required, Validators.email]);
  nome = new FormControl('', [Validators.required]);
  login = new FormControl('', [Validators.required]);
  senha = new FormControl('', [Validators.required, Validators.minLength(8)]);
  hide = true;

  criarConta = false;

  constructor(
    public dialogRef: MatDialogRef<CriarContaComponent>,
    public store: Store,
    private router: Router
  ) { 
    this.criarConta$ = this.store.select(selecionarManipularConta);
  }

  ngOnInit(): void {
    this.criarFormulario(new CriarConta());
    this.criarFormularioLogin(new Login());
  }

  criarFormulario(conta: CriarConta) {
    this.formConta = new FormGroup({
      nome: new FormControl(conta.nome_usuario),
      login: new FormControl(conta.email_usuario),
      senha: new FormControl(conta.senha_usuario)
    })
  }
  criarFormularioLogin(login: Login) {
    this.formLogin = new FormGroup({
      login_usuario: new FormControl(login.email),
      senha_usuario: new FormControl(login.senha)
    })
  }

  telaCriarConta() {
    this.criarConta = !this.criarConta;
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email precisa ter um valor';
    }
    return this.email.hasError('email') ? 'Não é válido' : '';
  }

  logarPerfil() {
    let login: Login = new Login();
    login.email = this.formLogin.get("login_usuario")?.value;
    login.senha= this.formLogin.get("senha_usuario")?.value;
    this.store.dispatch(loginConta({ login: login }));
    this.formLogin.reset();
    this.criarConta$.subscribe(item => {
      this.mensagemConta = item.mensagem;
      if(this.mensagemConta != "")
        if(this.mensagemConta == "Usuário autenticado com sucesso.") {
          this.dialogRef.close(this.mensagemConta);
          this.router.navigate([`/perfil/${item.login_usuario.split("@")[0]}`])
        } else {
          this.dialogRef.close(this.mensagemConta);
          this.router.navigate(['']);
        }
        
    })
    
  }

  requestCriarConta() {
    let conta: CriarConta = new CriarConta();
    conta.email_usuario = this.formConta.get("login")?.value;
    conta.nome_usuario = this.formConta.get("nome")?.value;
    conta.senha_usuario = this.formConta.get("senha")?.value;
    this.store.dispatch(criarConta({ conta: conta }));
    this.formConta.reset();
    this.criarConta$.subscribe(item => {
      this.mensagemConta = item.mensagem;
      if(this.mensagemConta != "")
        this.dialogRef.close(this.mensagemConta);
    })
  }

  fecharModal() {
    this.dialogRef.close();
  }

}
