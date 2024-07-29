import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  ProfessorPerfilVisualizarComponent,
  VisualizarNoticiaComponent 
} from 'src/app/componentes';

import { 
  AulaModel,
  NoticiaViewModel
} from 'src/app/models';

import { 
  adicionarRota,
  alterarTituloPagina,
  getManyNoticiaFilter, 
  selecionarManyNoticia 
} from 'src/app/store';

@Component({
  selector: 'app-painel-noticia',
  templateUrl: './painel-noticia.component.html',
  styleUrls: ['./painel-noticia.component.css']
})
export class PainelNoticiaComponent implements OnInit {

  noticiaManySubscription$: Subscription = new Subscription();
  noticiaMany$: Observable<NoticiaViewModel[]> = new Observable<NoticiaViewModel[]>();
  noticiaMany: NoticiaViewModel[] = [];

  constructor(
    private dialog: MatDialog,
    public router: Router,
    public store: Store,
  ) { 
    this.store.dispatch(selecionarManyNoticia());
    this.store.dispatch(alterarTituloPagina({ titulo: 'Painel de notícias', areaFisicaId: 0 }));
  }

  ngOnInit(): void {
    this.setupNoticia();
  }

  ngOnDestroy(): void {
    this.noticiaManySubscription$.unsubscribe();
  }

  setupNoticia() {
    this.noticiaMany$ = this.store.select(getManyNoticiaFilter);
    this.noticiaManySubscription$ = this.noticiaMany$.subscribe(itens => {
      this.noticiaMany = itens;
    });
  }
 
  visualizarNoticia(item: NoticiaViewModel) {
    this.dialog.open(VisualizarNoticiaComponent, {
      data: item.id,
      width: '90%',
      height: 'auto',
    });
  }

  visualizarUsuario(item: NoticiaViewModel) {
    this.dialog.open(ProfessorPerfilVisualizarComponent, {
      data: item.usuarioCadastroId,
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
