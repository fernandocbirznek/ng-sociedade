import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { 
  EditarUsuarioAreaInteresseComponent, 
  ProfessorEditarPerfilComponent
} from '../../../../../componentes';

import { 
  AreaInteresseModel,
  UsuarioModel 
} from '../../../../../models';

@Component({
  selector: 'app-administrador-perfil',
  templateUrl: './administrador-perfil.component.html',
  styleUrls: ['./administrador-perfil.component.css']
})
export class AdministradorPerfilComponent implements OnInit {
  @Input() usuarioLogado: UsuarioModel = UsuarioModel.create({});

  areaInteresseMany: AreaInteresseModel[] = [];

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.setupAreaInteresseMany();
  }

  setupAreaInteresseMany() {
    this.areaInteresseMany = this.usuarioLogado.usuarioAreaInteresses;
  }

  editarPerfil() {
    this.dialog.open(ProfessorEditarPerfilComponent, {
      data: this.usuarioLogado
    });
  }

  editarAreaInteresse() {
    this.dialog.open(EditarUsuarioAreaInteresseComponent, {
      data: this.usuarioLogado
    }).afterClosed()
      .subscribe((areaInteresseModel: AreaInteresseModel[] | undefined) => {
        if (areaInteresseModel)
          this.areaInteresseMany = areaInteresseModel;
    });
  }


}
