import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  NoticiaModel 
} from 'src/app/models';

import { 
  selecionarManyAreaFisica,
  selecionarManyNoticia,
  selecionarManyNoticiaHome 
} from 'src/app/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  noticiaManySubscription$: Subscription = new Subscription();
  noticiaMany$: Observable<NoticiaModel[]> = new Observable<NoticiaModel[]>();
  noticiaMany: NoticiaModel[] = [];

  constructor(
    public store: Store,
  ) {
    this.store.dispatch(selecionarManyNoticiaHome());
    this.store.dispatch(selecionarManyAreaFisica());
  }

  ngOnInit(): void {
    this.setupNoticia();
  }

  ngOnDestroy() {
    this.noticiaManySubscription$.unsubscribe();
  }

  setupNoticia() {
    this.noticiaMany$ = this.store.select(selecionarManyNoticia);
    this.noticiaManySubscription$ = this.noticiaMany$.subscribe(itens => {
      if(itens)
        this.noticiaMany = itens;
    });
  }
}
