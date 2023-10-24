import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { 
  NoticiaModel 
} from 'src/app/models';

import { 
  selecionarManyNoticia,
  selecionarManyNoticiaHome 
} from 'src/app/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  noticias$: Observable<NoticiaModel[]> = new Observable<NoticiaModel[]>();
  noticias: NoticiaModel[] = [];

  constructor(
    public store: Store,
  ) {
    this.store.dispatch(selecionarManyNoticiaHome());
  }

  ngOnInit(): void {
    this.setupNoticia();
  }

  setupNoticia() {
    this.noticias$ = this.store.select(selecionarManyNoticia);
    this.noticias$.subscribe(noticias => {
      if(noticias)
        this.noticias = noticias;
      console.log("noticias = ", noticias);
    });
  }
}
