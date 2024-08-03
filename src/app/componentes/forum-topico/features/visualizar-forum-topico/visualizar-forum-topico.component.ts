import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { 
  ForumTopicoEnum, 
  ForumTopicoViewModel, 
  UsuarioModel
} from 'src/app/models';

import { 
  excluirForumTopico,
  getOneForumTopicoById, 
  getOneUsuarioLogado,
  removerRota,
} from 'src/app/store';

import { 
  AtualizarForumTopicoComponent, 
  ModalExcluirComponent 
} from 'src/app/componentes';

@Component({
  selector: 'app-visualizar-forum-topico',
  templateUrl: './visualizar-forum-topico.component.html',
  styleUrls: ['./visualizar-forum-topico.component.css']
})
export class VisualizarForumTopicoComponent implements OnInit {

  forumTopicoSubscription$: Subscription = new Subscription();
  forumTopico$: Observable<ForumTopicoViewModel | undefined> = new Observable<ForumTopicoViewModel | undefined>();
  forumTopico: ForumTopicoViewModel | undefined = undefined;

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel | undefined> = new Observable<UsuarioModel | undefined>();
  usuarioLogado: UsuarioModel | undefined = undefined ;

  forumTopicoId: number = 0;

  trustedVisualizarForumTopicoHtml : SafeHtml | undefined = undefined;

  readonly forumTopicoEnum = ForumTopicoEnum;

  formConteudoEditarTopico = new FormControl('', [Validators.required, Validators.maxLength(8000)]);

  constructor(
    public store: Store,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    public router: Router,
  ) { 
    this.forumTopicoId = this.route.snapshot.paramMap.get('id') ? +this.route.snapshot.paramMap.get('id')!: 0;
    console.log(" this.forumTopicoId = ",  this.forumTopicoId);
  }

  ngOnInit(): void {
    this.setupForumTopico();
    this.setupUsuarioLogado();
  }

  ngOnDestroy() {
    this.forumTopicoSubscription$.unsubscribe();
    this.usuarioLogadoSubscription$.unsubscribe();
  }

  setupForumTopico() {
    this.forumTopico$ = this.store.select(getOneForumTopicoById(this.forumTopicoId));
    this.forumTopicoSubscription$ = this.forumTopico$.subscribe(item => {
      if (item) {
        this.forumTopico = item;
        this.trustedVisualizarForumTopicoHtml = this.sanitizer.bypassSecurityTrustHtml(item.descricao);
      }  
    });
  }

  setupUsuarioLogado() {
    this.usuarioLogado$ = this.store.select(getOneUsuarioLogado);
    this.usuarioLogadoSubscription$ = this.usuarioLogado$.subscribe(item => {
      if(item)
        this.usuarioLogado = item;
    });
  }

  excluirForumTopico() {
    if(this.forumTopico)
      this.dialog.open(ModalExcluirComponent, {
        data: `Fórum tópico: ${this.forumTopico.titulo}`
      }).afterClosed().subscribe((evento) => {
        if(evento && this.forumTopico) {
          this.store.dispatch(removerRota({ 
            rota: {
              rotaNome: '', 
              rotaAcessar: ``,
              rotaNivel: 3
            } 
          }));
          this.store.dispatch(excluirForumTopico({ forumTopicoId: this.forumTopico.id }));
          //TODO, verificar para corrigir
          this.router.navigate([`forum/1/forum-topico`]);
        }
      });
  }

  editarForumTopico() {
    this.dialog.open(AtualizarForumTopicoComponent, {
      data: { forumTopico: this.forumTopico }
    });
  }
}