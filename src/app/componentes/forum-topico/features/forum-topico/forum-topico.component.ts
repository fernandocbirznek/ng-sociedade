import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  InserirForumTopicoComponent 
} from '../../../../componentes';

import { 
  ForumModel,
  ForumTopicoEnum,
  ForumTopicoViewModel,
  UsuarioModel, 
} from '../../../../models';

import { 
  adicionarRota,
  getManyForumTopico, 
  getOneForumByForumId,
  getOneUsuarioLogado,
} from '../../../../store';

@Component({
  selector: 'app-forum-topico',
  templateUrl: './forum-topico.component.html',
  styleUrls: ['./forum-topico.component.css']
})
export class ForumTopicoComponent implements OnInit {
  forumId: number = 0;

  forumSubscription$: Subscription = new Subscription();
  forum$: Observable<ForumModel | undefined> = new Observable<ForumModel | undefined>();
  forum: ForumModel | undefined = undefined;

  forumTopicoManySubscription$: Subscription = new Subscription();
  forumTopicoMany$: Observable<ForumTopicoViewModel[]> = new Observable<ForumTopicoViewModel[]>();
  forumTopicoMany: ForumTopicoViewModel[] = [];

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel | undefined> = new Observable<UsuarioModel | undefined>();
  usuarioLogado: UsuarioModel | undefined = undefined;

  readonly forumTopicoEnum = ForumTopicoEnum;

  constructor(
    private dialog: MatDialog,
    public store: Store,
    public router: Router,
    private route: ActivatedRoute,
  ) { 
    this.forumId = this.route.snapshot.paramMap.get('id') ? +this.route.snapshot.paramMap.get('id')!: 0;
  }

  ngOnInit(): void {
    this.setupForum();
    this.setupForumTopico();
    this.setupUsuarioLogado();
  }

  ngOnDestroy() {
    this.forumSubscription$.unsubscribe();
    this.forumTopicoManySubscription$.unsubscribe();
  }

  setupForum() {
    this.forum$ = this.store.select(getOneForumByForumId(this.forumId));
    this.forumSubscription$ = this.forum$.subscribe(item => {
      if (item)
        this.forum = item;        
    });
  }

  setupForumTopico() {
    this.forumTopicoMany$ = this.store.select(getManyForumTopico);
    this.forumTopicoManySubscription$ = this.forumTopicoMany$.subscribe(itens => {
      this.forumTopicoMany = itens;        
    });
  }

  setupUsuarioLogado() {
    this.usuarioLogado$ = this.store.select(getOneUsuarioLogado);
    this.usuarioLogadoSubscription$ = this.usuarioLogado$.subscribe(item => {
      this.usuarioLogado = item;
    });
  }

  acessarForumTopico(item: ForumTopicoViewModel) {
    this.store.dispatch(adicionarRota({ 
      rota: {rotaNome: item.titulo, 
      rotaAcessar: `forum/${this.forumId}/forum-topico/${item.id}`,
      rotaNivel: 3} 
    }));
    this.router.navigate([`forum/${this.forumId}/forum-topico/${item.id}`]);
  }

  aplicarFiltro(item: any) {
    
  }

  criarForum() {
    this.dialog.open(InserirForumTopicoComponent, {
      data: { forumId: this.forumId },
      maxHeight: "90%"
    });
  }

}
