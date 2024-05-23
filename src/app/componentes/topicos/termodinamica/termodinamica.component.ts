import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AulaModel 
} from 'src/app/models';

import { 
  getManyAulaByAreaFisicaId,
  selecionarManyAulaByAreaFisicaId 
} from 'src/app/store';

@Component({
  selector: 'app-termodinamica',
  templateUrl: './termodinamica.component.html',
  styleUrls: ['./termodinamica.component.css']
})
export class TermodinamicaComponent implements OnInit {

  aulaManySubscription$: Subscription = new Subscription();
  aulaMany$: Observable<AulaModel[]> = new Observable<AulaModel[]>();
  aulaMany: AulaModel[] = [];

  pageAulaMany: AulaModel[] = [];
  pageSize: number = 4;
  pageMax: number = 1;
  pageAtual: number = 0;

  areaFisicaId: number = 0;

  constructor(
    public store: Store,
    private activatedRoute : ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.areaFisicaId = +this.activatedRoute.snapshot.queryParamMap.get("areaFisicaId")!;
    this.setupAula();
  }

  mudarPagina(page: number) {
    if (page < 0 && this.pageAtual - 1 >= 0)
      this.pageAtual--;
    if (page > 0 && this.pageAtual + 1 < this.pageMax)
      this.pageAtual++;

    this.pageAulaMany = this.aulaMany.slice(this.pageSize * this.pageAtual, (this.pageAtual + 1) * this.pageSize);
  }

  setupAula() {
    //TODO, colocar no resolver
    this.store.dispatch(selecionarManyAulaByAreaFisicaId({ areaFisicaId: this.areaFisicaId}));

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
    this.router.navigate([`visualizar-aula/${item.id}`]);
  }

}
