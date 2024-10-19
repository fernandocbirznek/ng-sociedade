import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  ForumModel 
} from '../../../../models';

import { 
  adicionarRota,
  getManyForum, 
} from '../../../../store';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  forumManySubscription$: Subscription = new Subscription();
  forumMany$: Observable<ForumModel[]> = new Observable<ForumModel[]>();
  forumMany: ForumModel[] = [];

  constructor(
    public store: Store,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.setupForum();
  }

  ngOnDestroy() {
    this.forumManySubscription$.unsubscribe();
  }

  setupForum() {
    this.forumMany$ = this.store.select(getManyForum);
    this.forumManySubscription$ = this.forumMany$.subscribe(itens => {
      if (itens) 
        this.forumMany = itens;        
    });
  }

  acessarForum(item: ForumModel) {
    this.store.dispatch(adicionarRota({ 
      rota: {rotaNome: item.titulo, 
      rotaAcessar: `forum/${item.id}/forum-topico`,
      rotaNivel: 2} 
    }));
    this.router.navigate([`forum/${item.id}/forum-topico`]);
  }

}
