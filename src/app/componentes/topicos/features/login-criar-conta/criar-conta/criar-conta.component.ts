import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { 
  CriarContaPerfilModel 
} from '../../../../../models';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {

  @Output() ngCriarConta= new EventEmitter<CriarContaPerfilModel>();

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
    let conta: CriarContaPerfilModel = CriarContaPerfilModel.create({
      email: this.formConta.get("email")?.value,
      nome: this.formConta.get("nome")?.value,
      senha: this.formConta.get("senha")?.value
    });

    this.formConta.reset();
    this.ngCriarConta.emit(conta);
  }

  fecharModal() {
    this.ngCriarConta.emit();
  }
}
