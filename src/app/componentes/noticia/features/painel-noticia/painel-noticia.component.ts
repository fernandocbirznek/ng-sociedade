import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  NoticiaHelpers,
  ProfessorPerfilVisualizarComponent,
  VisualizarNoticiaComponent 
} from 'src/app/componentes';

import { 
  AreaInteresseModel,
  AulaModel,
  NoticiaFilterModel,
  NoticiaFilterSelectedModel,
  NoticiaModel, 
  NoticiaViewModel
} from 'src/app/models';

import { 
  alterarTituloPagina,
  filtrarNoticia,
  getAreaInteresseMany,
  getManyNoticiaFilter, 
  getNoticiaFilter, 
  selecionarManyNoticia 
} from 'src/app/store';

@Component({
  selector: 'app-painel-noticia',
  templateUrl: './painel-noticia.component.html',
  styleUrls: ['./painel-noticia.component.css']
})
export class PainelNoticiaComponent implements OnInit {

  areaInteresseManySubscription$: Subscription = new Subscription();
  areaInteresseMany$: Observable<AreaInteresseModel[]> = new Observable<AreaInteresseModel[]>();
  areaInteresseMany: AreaInteresseModel[] = [];

  noticiaFilterSubscription$: Subscription = new Subscription();
  noticiaFilter$: Observable<NoticiaFilterModel> = new Observable<NoticiaFilterModel>();
  noticiaFilter: NoticiaFilterModel = new NoticiaFilterModel();
  noticiaFilterSelectedMany: NoticiaFilterSelectedModel[] = [];

  noticiaManySubscription$: Subscription = new Subscription();
  noticiaMany$: Observable<NoticiaViewModel[]> = new Observable<NoticiaViewModel[]>();
  noticiaMany: NoticiaViewModel[] = [];

  formControlTitulo = new FormControl('');
  formControlNome = new FormControl('');
  formControlDataInicio = new FormControl('');
  formControlDataFim = new FormControl('');

  constructor(
    private dialog: MatDialog,
    public router: Router,
    public store: Store,
  ) { 
    this.store.dispatch(selecionarManyNoticia());
    this.store.dispatch(alterarTituloPagina({ titulo: 'Painel de notícias' }));
  }

  ngOnInit(): void {
    this.setupAreaInteresse();
    this.setupNoticia();
    this.setupNoticiaFilter();
  }

  ngOnDestroy(): void {
    this.areaInteresseManySubscription$.unsubscribe();
    this.noticiaFilterSubscription$.unsubscribe();
    this.noticiaManySubscription$.unsubscribe();
  }

  setupAreaInteresse() {
    this.areaInteresseMany$ = this.store.select(getAreaInteresseMany);
    this.areaInteresseManySubscription$ = this.areaInteresseMany$.subscribe(itens => {
      this.areaInteresseMany = itens;
    });
  }

  setupNoticia() {
    this.noticiaMany$ = this.store.select(getManyNoticiaFilter);
    this.noticiaManySubscription$ = this.noticiaMany$.subscribe(itens => {
      this.noticiaMany = itens;
    });
  }

  setupNoticiaFilter() {
    this.noticiaFilter$ = this.store.select(getNoticiaFilter);
    this.noticiaFilterSubscription$ = this.noticiaFilter$.subscribe(item => {
      this.noticiaFilter = item;
      this.noticiaFilterSelectedMany = NoticiaHelpers.noticiaSelectedItemMany(item);
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
      if(aula)
        this.router.navigate([`visualizar-aula/${aula.id}`]);
    });
  }

  filtroTitulo() {
    this.noticiaFilter = {
      ...this.noticiaFilter,
      noticiaTitulo: this.formControlTitulo.value
    }
    
    this.store.dispatch(filtrarNoticia({ noticiaFilter: this.noticiaFilter }));
  }

  filtroNomeUsuario() {
    this.noticiaFilter = {
      ...this.noticiaFilter,
      usuarioNome: this.formControlNome.value
    }
    
    this.store.dispatch(filtrarNoticia({ noticiaFilter: this.noticiaFilter }));
  }

  filtroDataInicio() {
    this.noticiaFilter = {
      ...this.noticiaFilter,
      dataInicio: this.formControlDataInicio.value
    }
    
    this.store.dispatch(filtrarNoticia({ noticiaFilter: this.noticiaFilter }));
  }

  filtroDataFim() {
    this.noticiaFilter = {
      ...this.noticiaFilter,
      dataFim: this.formControlDataFim.value
    }
    
    this.store.dispatch(filtrarNoticia({ noticiaFilter: this.noticiaFilter }));
  }

  filtroTag(areaInteresseSelected: AreaInteresseModel) {
    let areaInteresse = this.noticiaFilter.areaInteresseMany.find(areaInteresse => areaInteresse.id == areaInteresseSelected.id);

    if (areaInteresse) {
      let filtrado = [...this.noticiaFilter.areaInteresseMany.filter(item => item.id != areaInteresseSelected.id)];
      this.noticiaFilter = {
        ...this.noticiaFilter,
        areaInteresseMany: filtrado
      }
    }
      
    else {
      let novo: AreaInteresseModel[] = [...this.noticiaFilter.areaInteresseMany];
      novo.push(areaInteresseSelected);
      this.noticiaFilter = {
        ...this.noticiaFilter,
        areaInteresseMany: novo
      }
    }
    
    this.store.dispatch(filtrarNoticia({ noticiaFilter: this.noticiaFilter }));
  }

  retirarFiltro(item: NoticiaFilterSelectedModel) {
    switch (item.id) {
      case 1000:
        this.retirarFiltroTitulo();
        break;
      case 2000:
        this.retirarFiltroNome();
        break;
      case 3000:
        this.retirarFiltroDataInicio();
        break;
      case 4000:
        this.retirarFiltroDataFim();
        break;
    }
  }

  retirarFiltroTitulo() {
    this.noticiaFilter = {
      ...this.noticiaFilter,
      noticiaTitulo: undefined
    }
    
    this.store.dispatch(filtrarNoticia({ noticiaFilter: this.noticiaFilter }));
  }

  retirarFiltroNome() {
    this.noticiaFilter = {
      ...this.noticiaFilter,
      usuarioNome: undefined
    }
    
    this.store.dispatch(filtrarNoticia({ noticiaFilter: this.noticiaFilter }));
  }

  retirarFiltroDataInicio() {
    this.noticiaFilter = {
      ...this.noticiaFilter,
      dataInicio: undefined
    }
    
    this.store.dispatch(filtrarNoticia({ noticiaFilter: this.noticiaFilter }));
  }

  retirarFiltroDataFim() {
    this.noticiaFilter = {
      ...this.noticiaFilter,
      dataFim: undefined
    }
    
    this.store.dispatch(filtrarNoticia({ noticiaFilter: this.noticiaFilter }));
  }
}
