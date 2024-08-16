import { Component, Input, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { 
  ProfessorPerfilVisualizarComponent, 
  VisualizarNoticiaComponent 
} from 'src/app/componentes';

import { 
  AulaModel, NoticiaViewModel 
} from 'src/app/models';

import { 
  adicionarRota 
} from 'src/app/store';

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
      });
  }

  visualizarUsuario() {
    if (this.noticia)
      this.dialog.open(ProfessorPerfilVisualizarComponent, {
        data: this.noticia.usuarioCadastroId,
        width: '80%',
        height: 'auto',
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
