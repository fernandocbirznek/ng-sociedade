import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  ForumTopicoEnum, 
  ForumTopicoModel, 
  ForumTopicoReplicaModel, 
  ForumTopicoRespostaModel,
  UsuarioModel
} from 'src/app/models';

import { 
  excluirForumTopico,
  excluirForumTopicoReplica,
  excluirForumTopicoResposta,
  getManyForumTopicoReplicaByForumTopicoId,
  getManyForumTopicoRespostaByForumTopicoId,
  getOneForumTopicoById, 
  getOneUsuarioLogado,
  inserirForumTopicoReplica,
  inserirForumTopicoResposta,
  selecionarManyForumTopicoReplicaByForumTopicoId,
  selecionarManyForumTopicoRespostaByForumTopicoId
} from 'src/app/store';

import Editor from 'src/app/componentes/genericos/ckeditor/build/ckeditor';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { 
  AtualizarForumTopicoComponent, 
  AtualizarForumTopicoReplicaComponent, 
  AtualizarForumTopicoRespostaComponent, 
  ModalExcluirComponent 
} from 'src/app/componentes';

export class ComentarioView {
  trustedHtml: SafeHtml = '';
  forumTopicoComentario: ForumTopicoReplicaModel | ForumTopicoRespostaModel = new ForumTopicoRespostaModel();
}

@Component({
  selector: 'app-visualizar-forum-topico',
  templateUrl: './visualizar-forum-topico.component.html',
  styleUrls: ['./visualizar-forum-topico.component.css']
})
export class VisualizarForumTopicoComponent implements OnInit {

  forumTopicoSubscription$: Subscription = new Subscription();
  forumTopico$: Observable<ForumTopicoModel | undefined> = new Observable<ForumTopicoModel | undefined>();
  forumTopico: ForumTopicoModel | undefined = undefined;

  forumTopicoReplicaSubscription$: Subscription = new Subscription();
  forumTopicoReplica$: Observable<ForumTopicoReplicaModel[]> = new Observable<ForumTopicoReplicaModel[]>();
  forumTopicoReplicaMany: ComentarioView[] = [];

  forumTopicoRespostaSubscription$: Subscription = new Subscription();
  forumTopicoResposta$: Observable<ForumTopicoRespostaModel[]> = new Observable<ForumTopicoRespostaModel[]>();
  forumTopicoRespostaMany: ComentarioView[] = [];

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel> = new Observable<UsuarioModel>();
  usuarioLogado: UsuarioModel | undefined = undefined ;

  forumTopicoId: number = 0;

  trustedVisualizarForumTopicoHtml : SafeHtml | undefined = undefined;

  responderTopico: boolean = false;
  isReplicaTopico: boolean = false;

  readonly forumTopicoEnum = ForumTopicoEnum;

  public ckEditor = Editor;

  formConteudoEditarTopico = new FormControl('', [Validators.required, Validators.maxLength(8000)]);
  formConteudoResponderTopico = new FormControl('', [Validators.required, Validators.maxLength(8000)]);
  formConteudoReplicaTopico = new FormControl('', [Validators.required, Validators.maxLength(8000)]);

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
    this.setupForumTopicoReplica();
    this.setupForumTopicoResposta();
    this.setupUsuarioLogado();
  }

  ngOnDestroy() {
    this.forumTopicoSubscription$.unsubscribe();
    this.forumTopicoReplicaSubscription$.unsubscribe();
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

  setupForumTopicoReplica() {
    this.store.dispatch(selecionarManyForumTopicoReplicaByForumTopicoId({ forumTopicoId: this.forumTopicoId }));
    this.forumTopicoReplica$ = this.store.select(getManyForumTopicoReplicaByForumTopicoId(this.forumTopicoId));
    this.forumTopicoReplicaSubscription$ = this.forumTopicoReplica$.subscribe(itens => {
      this.forumTopicoReplicaMany = [];
      itens.forEach(item => {
        let comentarioView = new ComentarioView();
        comentarioView.trustedHtml = this.sanitizer.bypassSecurityTrustHtml(item.descricao);
        comentarioView.forumTopicoComentario = item;
        this.forumTopicoReplicaMany.push(comentarioView);
      });
    });
  }

  setupForumTopicoResposta() {
    this.store.dispatch(selecionarManyForumTopicoRespostaByForumTopicoId({ forumTopicoId: this.forumTopicoId }));
    this.forumTopicoResposta$ = this.store.select(getManyForumTopicoRespostaByForumTopicoId(this.forumTopicoId));
    this.forumTopicoRespostaSubscription$ = this.forumTopicoResposta$.subscribe(itens => {
      this.forumTopicoRespostaMany = [];
      itens.forEach(item => {
        let comentarioView = new ComentarioView();
        comentarioView.trustedHtml = this.sanitizer.bypassSecurityTrustHtml(item.descricao);
        comentarioView.forumTopicoComentario = item;
        this.forumTopicoRespostaMany.push(comentarioView);
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

  excluirRespostaForumTopico(item: any) {
    this.dialog.open(ModalExcluirComponent, {
      data: `Comentário do fórum`
    }).afterClosed().subscribe((evento) => {
      if(evento) {
        this.store.dispatch(excluirForumTopicoResposta({ forumTopicoRespostaId: item.id }));
      }
    });
  }

  editarRespostaForumTopico(item: any) {
    this.dialog.open(AtualizarForumTopicoRespostaComponent, {
      data: { forumTopicoResposta: item }
    });
  }

  replicaForumTopico() {
    this.isReplicaTopico = !this.isReplicaTopico;
  }

  requestReplicaForumTopico(item: any) {
    if (this.usuarioLogado) {
      let forumTopicoReplica = new ForumTopicoReplicaModel();
      forumTopicoReplica.descricao = this.formConteudoReplicaTopico.value;
      forumTopicoReplica.forumTopicoId = this.forumTopicoId;
      forumTopicoReplica.usuarioId = this.usuarioLogado.id;
      forumTopicoReplica.forumTopicoRespostaId = item.id;

      this.store.dispatch(inserirForumTopicoReplica({ forumTopicoReplica: forumTopicoReplica }));
    }
  }

  excluirReplicaForumTopico(item: any) {
    this.dialog.open(ModalExcluirComponent, {
      data: `Replica`
    }).afterClosed().subscribe((evento) => {
      if(evento && this.forumTopico) {
        this.store.dispatch(excluirForumTopicoReplica({ forumTopicoReplicaId: item.id }));
      }
    });
  }

  editarReplicaForumTopico(item: any) {
    this.dialog.open(AtualizarForumTopicoReplicaComponent, {
      data: { forumTopicoReplica: item }
    });
  }
}
