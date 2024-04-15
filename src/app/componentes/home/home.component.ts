import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  NoticiaModel 
} from 'src/app/models';

import { 
  getManyNoticiaHome,
  selecionarAreaInteresseMany,
  selecionarNoticiaManyHome 
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
    //TODO, ficar aqui ou alterar para o resolver global?
    this.store.dispatch(selecionarAreaInteresseMany());
    this.store.dispatch(selecionarNoticiaManyHome());
  }

  ngOnInit(): void {
    this.setupNoticia();
  }

  ngOnDestroy() {
    this.noticiaManySubscription$.unsubscribe();
  }

  setupNoticia() {
    this.noticiaMany$ = this.store.select(getManyNoticiaHome);
    this.noticiaManySubscription$ = this.noticiaMany$.subscribe(itens => {
      if(itens)
        this.noticiaMany = itens;
    });
  }
}
