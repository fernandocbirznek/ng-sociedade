import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AreaFisicaDivisaoModel,
  AreaFisicaModel,
  AulaModel 
} from 'src/app/models';

import { 
  getAreaFisicaId,
  getManyAreaFisicaDivisaoByAreaFisicaId,
  getManyAulaByAreaFisicaId,
  getOneAreaFisicaByAreaFisicaId,
  getTituloPagina,
  selecionarManyAreaFisicaDivisaoByAreaFisicaId,
  selecionarManyAulaByAreaFisicaId 
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
  aulaMany$: Observable<AulaModel[]> = new Observable<AulaModel[]>();
  aulaMany: AulaModel[] = [];

  headerAreaFisicaIdSubscription$: Subscription = new Subscription();
  headerAreaFisicaId$: Observable<number> = new Observable<number>();
  headerAreaFisicaId: number = 0;

  pageAulaMany: AulaModel[] = [];
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
    this.setupAreaFisicaId();
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

  setupAreaFisicaId() {
    this.headerAreaFisicaId$ = this.store.select(getAreaFisicaId);
    this.headerAreaFisicaIdSubscription$ = this.headerAreaFisicaId$.subscribe(item => {
      this.store.dispatch(selecionarManyAulaByAreaFisicaId({ areaFisicaId: item}));
      this.store.dispatch(selecionarManyAreaFisicaDivisaoByAreaFisicaId({ areaFisicaId: item}));
    });
  }

  setupPage() {
    this.pageMax = Math.ceil(this.aulaMany.length/this.pageSize);
    this.pageAulaMany = this.aulaMany.slice(this.pageAtual, this.pageSize);
  }

  visualizarAula(item: AulaModel) {
    this.router.navigate([`visualizar-aula/${item.id}`]);
  }
}
