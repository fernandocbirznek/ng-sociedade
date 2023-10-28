import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CriarConta } from 'src/app/models';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {

  @Output() ngCriarConta= new EventEmitter<CriarConta>();

  formConta: FormGroup = null as any;

  email = new FormControl('', [Validators.required, Validators.email]);
  nome = new FormControl('', [Validators.required,  Validators.minLength(3)]);
  senha = new FormControl('', [Validators.required, Validators.minLength(8)]);
  hide = true;

  constructor(
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario() {
    this.formConta = new FormGroup({
      nome: this.nome,
      email: this.email,
      senha: this.senha
    })
  }

  requestCriarConta() {
    let conta: CriarConta = new CriarConta();
    conta.email = this.formConta.get("email")?.value;
    conta.nome = this.formConta.get("nome")?.value;
    conta.senha = this.formConta.get("senha")?.value;
    this.formConta.reset();
    this.ngCriarConta.emit(conta);
  }

  fecharModal() {
    this.ngCriarConta.emit();
  }
}
