import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { 
  AreaInteresseModel,
  UsuarioModel 
} from 'src/app/models';

import { 
  EditarUsuarioAreaInteresseComponent 
} from '..';

@Component({
  selector: 'app-usuario-area-interesse',
  templateUrl: './usuario-area-interesse.component.html',
  styleUrls: ['./usuario-area-interesse.component.css']
})
export class UsuarioAreaInteresseComponent implements OnInit {
  @Input() usuarioLogado: UsuarioModel | undefined = undefined;

  areaInteresseMany: AreaInteresseModel[] = [];

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if (this.usuarioLogado)
      this.areaInteresseMany = this.usuarioLogado.usuarioAreaInteresses;
  }

  editarAreaInteresse() {
    this.dialog.open(EditarUsuarioAreaInteresseComponent, {
      data: this.usuarioLogado
    }).afterClosed()
      .subscribe((areaInteresseModel: AreaInteresseModel[]) => {
        this.areaInteresseMany = areaInteresseModel;
    });
  }
}
