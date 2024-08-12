import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AreaInteresseModel,
  NoticiaFilterModel, 
  NoticiaFilterSelectedModel 
} from 'src/app/models';

import { 
  filtrarNoticia,
  getManyAreaInteresse,
  getNoticiaFilter 
} from 'src/app/store';

import { FormControl } from '@angular/forms';

import { NoticiaHelpers } from 'src/app/componentes/noticia/helpers/noticia.helpers';

@Component({
  selector: 'app-noticia-filtro',
  templateUrl: './noticia-filtro.component.html',
  styleUrls: ['./noticia-filtro.component.css']
})
export class NoticiaFiltroComponent implements OnInit {
  @Input() flexColumn: boolean = false;

  areaInteresseManySubscription$: Subscription = new Subscription();
  areaInteresseMany$: Observable<AreaInteresseModel[]> = new Observable<AreaInteresseModel[]>();
  areaInteresseMany: AreaInteresseModel[] = [];

  noticiaFilterSubscription$: Subscription = new Subscription();
  noticiaFilter$: Observable<NoticiaFilterModel> = new Observable<NoticiaFilterModel>();
  noticiaFilter: NoticiaFilterModel = new NoticiaFilterModel();
  noticiaFilterSelectedMany: NoticiaFilterSelectedModel[] = [];

  formControlTitulo = new FormControl('');
  formControlNome = new FormControl('');
  formControlDataInicio = new FormControl('');
  formControlDataFim = new FormControl('');

  constructor(
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.setupAreaInteresse();
    this.setupNoticiaFilter();
  }

  ngOnDestroy(): void {
    this.areaInteresseManySubscription$.unsubscribe();
    this.noticiaFilterSubscription$.unsubscribe();
  }

  setupAreaInteresse() {
    this.areaInteresseMany$ = this.store.select(getManyAreaInteresse);
    this.areaInteresseManySubscription$ = this.areaInteresseMany$.subscribe(itens => {
      this.areaInteresseMany = itens;
    });
  }

  setupNoticiaFilter() {
    this.noticiaFilter$ = this.store.select(getNoticiaFilter);
    this.noticiaFilterSubscription$ = this.noticiaFilter$.subscribe(item => {
      this.noticiaFilter = item;
      this.noticiaFilterSelectedMany = NoticiaHelpers.noticiaSelectedItemMany(item);
    });
  }

  filtroTitulo() {
    this.noticiaFilter = {
      ...this.noticiaFilter,
      noticiaTitulo: this.formControlTitulo.value ? this.formControlTitulo.value : ''
    }
    
    this.store.dispatch(filtrarNoticia({ noticiaFilter: this.noticiaFilter }));
  }

  filtroNomeUsuario() {
    this.noticiaFilter = {
      ...this.noticiaFilter,
      usuarioNome: this.formControlNome.value ? this.formControlNome.value : ''
    }
    
    this.store.dispatch(filtrarNoticia({ noticiaFilter: this.noticiaFilter }));
  }

  filtroDataInicio() {
    this.noticiaFilter = {
      ...this.noticiaFilter,
      dataInicio: this.formControlDataInicio.value ? new Date(this.formControlDataInicio.value) : undefined
    }
    
    this.store.dispatch(filtrarNoticia({ noticiaFilter: this.noticiaFilter }));
  }

  filtroDataFim() {
    this.noticiaFilter = {
      ...this.noticiaFilter,
      dataFim: this.formControlDataFim.value ? new Date(this.formControlDataFim.value) : undefined
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
    this.formControlDataInicio.setValue(null);
    this.noticiaFilter = {
      ...this.noticiaFilter,
      dataInicio: undefined
    }
    
    this.store.dispatch(filtrarNoticia({ noticiaFilter: this.noticiaFilter }));
  }

  retirarFiltroDataFim() {
    this.formControlDataFim.setValue(null);
    this.noticiaFilter = {
      ...this.noticiaFilter,
      dataFim: undefined
    }
    
    this.store.dispatch(filtrarNoticia({ noticiaFilter: this.noticiaFilter }));
  }
}
