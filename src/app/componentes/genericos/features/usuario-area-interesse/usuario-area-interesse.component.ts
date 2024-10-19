import { Component, Input, OnInit } from '@angular/core';

import { 
  AreaInteresseModel,
  UsuarioModel 
} from '../../../../models';

import { 
  EditarUsuarioAreaInteresseComponent 
} from '..';

import { MatDialog } from '@angular/material/dialog';

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
    if (this.usuarioLogado && this.usuarioLogado.id > 0)
      this.areaInteresseMany = this.usuarioLogado.usuarioAreaInteresses;
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
