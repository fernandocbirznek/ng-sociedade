import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-criar-perfil',
  templateUrl: './criar-perfil.component.html',
  styleUrls: ['./criar-perfil.component.css']
})
export class CriarPerfilComponent implements OnInit {

  formPerfil: FormGroup = null as any;

  data = new FormControl('');
  foto = new FormControl('');
  hobbie = new FormControl('');

  constructor() { }

  ngOnInit(): void {
    this.criarFormularioPerfil();
  }

  criarFormularioPerfil() {
    this.formPerfil = new FormGroup({
      data: this.data,
      foto: this.foto,
      hobbie: this.hobbie
    })
  }

  requestCriarPerfil () {
    console.log("alterado")
  }

  fecharModal() {

  }

}
