import { Component, Input, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models';

@Component({
  selector: 'app-usuario-informacao',
  templateUrl: './usuario-informacao.component.html',
  styleUrls: ['./usuario-informacao.component.css']
})
export class UsuarioInformacaoComponent implements OnInit {
  @Input() usuarioLogado: UsuarioModel | undefined = undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
