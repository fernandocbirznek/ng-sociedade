import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  ForumTopicoEnum, 
  ForumTopicoModel, 
  ForumTopicoRespostaModel,
  UsuarioModel
} from 'src/app/models';

import { 
  excluirForumTopico,
  getManyForumTopicoRespostaByForumTopicoId,
  getOneForumTopicoById, 
  getOneUsuarioLogado,
  inserirForumTopicoResposta,
  selecionarManyForumTopicoRespostaByForumTopicoId
} from 'src/app/store';

import Editor from 'src/app/componentes/genericos/ckeditor/build/ckeditor';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AtualizarForumTopicoComponent, ModalExcluirComponent } from 'src/app/componentes';

@Component({
  selector: 'app-visualizar-forum-topico',
  templateUrl: './visualizar-forum-topico.component.html',
  styleUrls: ['./visualizar-forum-topico.component.css']
})
export class VisualizarForumTopicoComponent implements OnInit {

  forumTopicoSubscription$: Subscription = new Subscription();
  forumTopico$: Observable<ForumTopicoModel | undefined> = new Observable<ForumTopicoModel | undefined>();
  forumTopico: ForumTopicoModel | undefined = undefined;

  forumTopicoRespostaSubscription$: Subscription = new Subscription();
  forumTopicoResposta$: Observable<ForumTopicoRespostaModel[]> = new Observable<ForumTopicoRespostaModel[]>();
  trustedVisualizarForumTopicoRespostaHtml : SafeHtml[] = [];

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel> = new Observable<UsuarioModel>();
  usuarioLogado: UsuarioModel | undefined = undefined ;

  forumTopicoId: number = 0;

  trustedVisualizarForumTopicoHtml : SafeHtml | undefined = undefined;

  responderTopico: boolean = false;

  readonly forumTopicoEnum = ForumTopicoEnum;

  public ckEditor = Editor;

  formConteudoEditarTopico = new FormControl('', [Validators.required, Validators.maxLength(8000)]);
  formConteudoResponderTopico = new FormControl('', [Validators.required, Validators.maxLength(8000)]);

  constructor(
    public store: Store,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    public router: Router,
  ) { 
    this.forumTopicoId = this.route.snapshot.paramMap.get('id') ? +this.route.snapshot.paramMap.get('id')!: 0;
  }

  ngOnInit(): void {
    this.setupForumTopico();
    this.setupForumTopicoResposta();
    this.setupUsuarioLogado();
  }

  ngOnDestroy() {
    this.forumTopicoSubscription$.unsubscribe();
    this.forumTopicoRespostaSubscription$.unsubscribe();
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

  setupForumTopicoResposta() {
    this.store.dispatch(selecionarManyForumTopicoRespostaByForumTopicoId({ forumTopicoId: this.forumTopicoId }));
    this.forumTopicoResposta$ = this.store.select(getManyForumTopicoRespostaByForumTopicoId(this.forumTopicoId));
    this.forumTopicoRespostaSubscription$ = this.forumTopicoResposta$.subscribe(itens => {
      this.trustedVisualizarForumTopicoRespostaHtml = [];
      itens.forEach(item => {
        this.trustedVisualizarForumTopicoRespostaHtml.push(this.sanitizer.bypassSecurityTrustHtml(item.descricao));
      });
    });
  }

  setupUsuarioLogado() {
    this.usuarioLogado$ = this.store.select(getOneUsuarioLogado);
    this.usuarioLogadoSubscription$ = this.usuarioLogado$.subscribe(item => {
      if(item) {
        this.usuarioLogado = item;
      }  
    });
  }

  responderForumTopico() {
    this.responderTopico = !this.responderTopico;
  }

  requestForumTopico() {
    if (this.usuarioLogado) {
      let forumTopicoResposta = new ForumTopicoRespostaModel();
      forumTopicoResposta.descricao = this.formConteudoResponderTopico.value;
      forumTopicoResposta.forumTopicoId = this.forumTopicoId;
      forumTopicoResposta.usuarioId = this.usuarioLogado.id;

      this.store.dispatch(inserirForumTopicoResposta({ forumTopicoResposta: forumTopicoResposta }));
    }
  }

  excluirForumTopico() {
    if(this.forumTopico)
      this.dialog.open(ModalExcluirComponent, {
        data: `Fórum tópico: ${this.forumTopico.titulo}`
      }).afterClosed().subscribe((evento) => {
        if(evento && this.forumTopico) {
          this.store.dispatch(excluirForumTopico({ forumTopicoId: this.forumTopico.id }));
          this.router.navigate([`forum-topico/1`]);
        }
      });
  }

  editarForumTopico() {
    this.dialog.open(AtualizarForumTopicoComponent, {
      data: { forumTopico: this.forumTopico }
    });
  }
}
