import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { 
  ProfessorPerfilVisualizarComponent, 
  VisualizarNoticiaComponent 
} from '../../../../componentes';

import { 
  AulaModel, NoticiaViewModel 
} from '../../../../models';

import { 
  adicionarRota 
} from '../../../../store';

@Component({
  selector: 'app-card-noticia',
  templateUrl: './card-noticia.component.html',
  styleUrls: ['./card-noticia.component.css']
})
export class CardNoticiaComponent implements OnInit {
  @Input() noticia: NoticiaViewModel | undefined = undefined;

  constructor(
    private dialog: MatDialog,
    public router: Router,
    public store: Store,
  ) { }

  ngOnInit(): void {
  }

  visualizarNoticia() {
    if (this.noticia)
      this.dialog.open(VisualizarNoticiaComponent, {
        data: this.noticia.id,
        width: '90%',
        height: 'auto',
        maxHeight: '90%',
      });
  }

  visualizarUsuario() {
    if (this.noticia)
      this.dialog.open(ProfessorPerfilVisualizarComponent, {
        data: this.noticia.usuarioCadastroId,
        width: '80%',
        height: 'auto',
        maxHeight: '90%',
      }).afterClosed().subscribe((aula: AulaModel) => {
        if(aula) {
          this.store.dispatch(adicionarRota({ 
            rota: {
              rotaNome: 'aula', 
              rotaAcessar: `visualizar-aula/${aula.id}`,
              rotaNivel: 1
            } 
          }));
          this.router.navigate([`visualizar-aula/${aula.id}`]);
        } 
      });
  }
}
