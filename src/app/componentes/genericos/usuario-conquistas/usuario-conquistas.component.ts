import { Component, Input, OnInit } from '@angular/core';

import { 
  UsuarioModel 
} from 'src/app/models';

@Component({
  selector: 'app-usuario-conquistas',
  templateUrl: './usuario-conquistas.component.html',
  styleUrls: ['./usuario-conquistas.component.css']
})
export class UsuarioConquistasComponent implements OnInit {
  @Input() usuarioLogado: UsuarioModel = new UsuarioModel();

  constructor() { }

  ngOnInit(): void {
  }

}
