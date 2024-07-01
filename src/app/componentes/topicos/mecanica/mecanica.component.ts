import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AreaFisicaDivisaoModel,
  AreaFisicaModel,
  AulaModel, 
  AulaViewModel
} from 'src/app/models';

import { 
  alterarTituloPagina,
  atualizarAulaSelected,
  getManyAreaFisicaDivisaoByAreaFisicaId,
  getManyAulaByAreaFisicaId,
  getOneAreaFisicaByAreaFisicaId,
} from 'src/app/store';

@Component({
  selector: 'app-mecanica',
  templateUrl: './mecanica.component.html',
  styleUrls: ['./mecanica.component.css']
})
export class MecanicaComponent implements OnInit {

  areaFisicaSubscription$: Subscription = new Subscription();
  areaFisica$: Observable<AreaFisicaModel | undefined> = new Observable<AreaFisicaModel | undefined>();
  areaFisica: AreaFisicaModel | undefined = undefined;

  areaFisicaDivisaoManySubscription$: Subscription = new Subscription();
  areaFisicaDivisaoMany$: Observable<AreaFisicaDivisaoModel[]> = new Observable<AreaFisicaDivisaoModel[]>();
  areaFisicaDivisaoMany: AreaFisicaDivisaoModel[] = [];

  aulaManySubscription$: Subscription = new Subscription();
  aulaMany$: Observable<AulaViewModel[]> = new Observable<AulaViewModel[]>();
  aulaMany: AulaViewModel[] = [];

  pageAulaMany: AulaViewModel[] = [];
  pageSize: number = 4;
  pageMax: number = 1;
  pageAtual: number = 0;

  constructor(
    public store: Store,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.setupAreaFisica();
    this.setupAreaFisicaDivisao();
    this.setupAula();

    this.scrollToTop();
  }

  ngOnDestroy(): void {
    this.areaFisicaSubscription$.unsubscribe();
    this.areaFisicaDivisaoManySubscription$.unsubscribe();
    this.aulaManySubscription$.unsubscribe();
  }

  mudarPagina(page: number) {
    if (page < 0 && this.pageAtual - 1 >= 0)
      this.pageAtual--;
    if (page > 0 && this.pageAtual + 1 < this.pageMax)
      this.pageAtual++;

    this.pageAulaMany = this.aulaMany.slice(this.pageSize * this.pageAtual, (this.pageAtual + 1) * this.pageSize);
  }

  setupAreaFisica() {
    this.areaFisica$ = this.store.select(getOneAreaFisicaByAreaFisicaId);
    this.areaFisicaSubscription$ = this.areaFisica$.subscribe(item => {
      if (item)
        this.areaFisica = item;
    });
  }

  setupAreaFisicaDivisao() {
    this.areaFisicaDivisaoMany$ = this.store.select(getManyAreaFisicaDivisaoByAreaFisicaId);
    this.areaFisicaDivisaoManySubscription$ = this.areaFisicaDivisaoMany$.subscribe(itens => {
      this.areaFisicaDivisaoMany = itens;
    });
  }

  setupAula() {
    this.aulaMany$ = this.store.select(getManyAulaByAreaFisicaId);
    this.aulaManySubscription$ = this.aulaMany$.subscribe(itens => {
      this.aulaMany = itens;
      this.setupPage();
    });
  }

  setupPage() {
    this.pageMax = Math.ceil(this.aulaMany.length/this.pageSize);
    this.pageAulaMany = this.aulaMany.slice(this.pageAtual, this.pageSize);
  }

  visualizarAula(item: AulaModel) {
    this.store.dispatch(alterarTituloPagina({ titulo: `${item.titulo}`, areaFisicaId: item.areaFisicaId }));
    this.store.dispatch(atualizarAulaSelected({ aulaId: item.id }));
    this.router.navigate([`visualizar-aula/${item.id}`], { queryParams: { aulaTitulo: item.titulo }});
  }

  scrollToTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
}