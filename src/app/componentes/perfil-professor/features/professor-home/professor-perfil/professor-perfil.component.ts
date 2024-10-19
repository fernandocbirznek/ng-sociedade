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
  selector: 'app-professor-perfil',
  templateUrl: './professor-perfil.component.html',
  styleUrls: ['./professor-perfil.component.css']
})
export class ProfessorPerfilComponent implements OnInit {
  @Input() usuarioLogado: UsuarioModel = new UsuarioModel();

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
