import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AulaFilterModel, 
  TagModel, 
  TipoOrdenarAulaFiltroEnum
} from 'src/app/models';

import { 
  filtrarAula, 
  getManyTag, 
  getOneAulaFilter 
} from 'src/app/store';

@Component({
  selector: 'app-aula-filtro',
  templateUrl: './aula-filtro.component.html',
  styleUrls: ['./aula-filtro.component.css']
})
export class AulaFiltroComponent implements OnInit {

  aulaFilterSubscription$: Subscription = new Subscription();
  aulaFilter$: Observable<AulaFilterModel> = new Observable<AulaFilterModel>();
  aulaFilter: AulaFilterModel = new AulaFilterModel();

  tagManySubscription$: Subscription = new Subscription();
  tagMany$: Observable<TagModel[]> = new Observable<TagModel[]>();
  tagMany: TagModel[] = [];

  formControlNomeProfessor = new FormControl('');
  formControlTitulo = new FormControl('');
  formControlDataInicio = new FormControl('');
  formControlDataFim = new FormControl('');
  formControlOrdenar = new FormControl('');

  tagSelected: TagModel[] = [];
  tagSelectedId: number[] = [];

  readonly tipoOrdenarAulaFiltroEnum = TipoOrdenarAulaFiltroEnum;

  constructor(
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.setupAulaFilter();
    this.setupTag();
  }

  ngOnDestroy(): void {
    this.aulaFilterSubscription$.unsubscribe();
    this.tagManySubscription$.unsubscribe();
  }

  setupAulaFilter() {
    this.aulaFilter$ = this.store.select(getOneAulaFilter);
    this.aulaFilterSubscription$ = this.aulaFilter$.subscribe(item => {
      this.aulaFilter = item;
    });
  }

  setupTag() {
    this.tagMany$ = this.store.select(getManyTag);
    this.tagManySubscription$ = this.tagMany$.subscribe(itens => {
      this.tagMany = itens;
    });
  }

  filtroNomeProfessor() {
    this.aulaFilter = {
      ...this.aulaFilter,
      nomeProfessor: this.formControlTitulo.value ? this.formControlTitulo.value : ''
    }
    
    this.store.dispatch(filtrarAula({ aulaFilter: this.aulaFilter }));
  }
  
  filtroTitulo() {
    this.aulaFilter = {
      ...this.aulaFilter,
      aulaTitulo: this.formControlTitulo.value ? this.formControlTitulo.value : ''
    }
    
    this.store.dispatch(filtrarAula({ aulaFilter: this.aulaFilter }));
  }

  filtroDataInicio() {
    this.aulaFilter = {
      ...this.aulaFilter,
      dataInicio: this.formControlDataInicio.value ? new Date(this.formControlDataInicio.value) : undefined
    }
    
    this.store.dispatch(filtrarAula({ aulaFilter: this.aulaFilter }));
  }

  filtroDataFim() {
    this.aulaFilter = {
      ...this.aulaFilter,
      dataFim: this.formControlDataFim.value ? new Date(this.formControlDataFim.value) : undefined
    }
    
    this.store.dispatch(filtrarAula({ aulaFilter: this.aulaFilter }));
  }

  filtroTag() {
    this.aulaFilter = {
      ...this.aulaFilter,
      //TODO verificar
      //tagMany: this.formControlTitulo.value
    }
    
    this.store.dispatch(filtrarAula({ aulaFilter: this.aulaFilter }));
  }

  resetOrdenar() {
    this.formControlOrdenar.reset();
    this.aulaFilter = {
      ...this.aulaFilter,
      tipoOrdenarAulaFiltroEnum: TipoOrdenarAulaFiltroEnum.None
    }
    
    this.store.dispatch(filtrarAula({ aulaFilter: this.aulaFilter }));
  }

  ordenar(item: TipoOrdenarAulaFiltroEnum) {
    this.aulaFilter = {
      ...this.aulaFilter,
      tipoOrdenarAulaFiltroEnum: item
    }
    
    this.store.dispatch(filtrarAula({ aulaFilter: this.aulaFilter }));
  }

  selecionarTag(item: TagModel) {
    if (this.tagSelectedId.includes(item.id)) {
      this.tagSelectedId = this.tagSelectedId.filter(tagSelected => tagSelected != item.id);
      this.tagSelected = this.tagSelected.filter(tagSelected => tagSelected.id != item.id);
    }
    else {
      this.tagSelectedId.push(item.id);
      this.tagSelected = [...this.tagSelected, item];
    }
    this.aulaFilter = {
      ...this.aulaFilter,
      tagMany: this.tagSelected
    }
    
    this.store.dispatch(filtrarAula({ aulaFilter: this.aulaFilter }));
  }
}