import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { 
  CriarContaPerfilModel 
} from '../../../../../models';

@Component({
  selector: 'app-criar-perfil',
  templateUrl: './criar-perfil.component.html',
  styleUrls: ['./criar-perfil.component.css']
})
export class CriarPerfilComponent implements OnInit {
  @Output() ngCriarPerfil = new EventEmitter();

  formPerfil: FormGroup = null as any;

  data = new FormControl('');
  foto = new FormControl('');
  hobbie = new FormControl('');

  criarPerfil: CriarContaPerfilModel = CriarContaPerfilModel.create({});

  fotoEscolhida: File | undefined = undefined;
  selectedFile: File | null = null;

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

  requestCriarPerfil() {
    this.criarPerfil.dataNascimento = this.data.value ? new Date(this.data.value) : undefined;
    this.criarPerfil.hobbie = this.hobbie.value ? this.hobbie.value : '';
    this.ngCriarPerfil.emit(this.criarPerfil);
  }

  imagemAlterada(event: any) {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const bytes = e.target.result.split('base64,')[1];
      this.criarPerfil.foto = bytes;
      this.fotoEscolhida = bytes;
    };
    reader.readAsDataURL(event.target.files[0]);
    this.requestCriarPerfil();
  }
}
