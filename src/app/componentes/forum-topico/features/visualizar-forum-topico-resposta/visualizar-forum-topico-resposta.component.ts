import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AtualizarForumTopicoRespostaComponent, 
  ModalExcluirComponent 
} from '../../../../componentes';

import { 
  ComentarioView,
  ForumTopicoRespostaModel,
  ForumTopicoRespostaViewModel, 
  UsuarioModel
} from '../../../../models';

import { 
  excluirForumTopicoResposta, 
  getManyForumTopicoRespostaByForumTopicoId, 
  getOneUsuarioLogado,
  inserirForumTopicoResposta
} from '../../../../store';

@Component({
  selector: 'app-visualizar-forum-topico-resposta',
  templateUrl: './visualizar-forum-topico-resposta.component.html',
  styleUrls: ['./visualizar-forum-topico-resposta.component.css']
})
export class VisualizarForumTopicoRespostaComponent implements OnInit {
  @Input() forumTopicoId: number = 0;

  forumTopicoRespostaSubscription$: Subscription = new Subscription();
  forumTopicoResposta$: Observable<ForumTopicoRespostaViewModel[]> = new Observable<ForumTopicoRespostaViewModel[]>();
  forumTopicoRespostaMany: ComentarioView[] = [];

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel | undefined> = new Observable<UsuarioModel | undefined>();
  usuarioLogado: UsuarioModel | undefined = undefined;

  formConteudoResponderTopico = new FormControl('', [Validators.required, Validators.maxLength(8000)]);
  
  responderTopico: boolean = false;

  constructor(
    public store: Store,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.setupForumTopicoResposta();
    this.setupUsuarioLogado();

    this.formConteudoResponderTopico.setValue('Escreva uma resposta');
  }

  ngOnDestroy() {
    this.forumTopicoRespostaSubscription$.unsubscribe();
    this.usuarioLogadoSubscription$.unsubscribe();
  }

  setupForumTopicoResposta() {
    this.forumTopicoResposta$ = this.store.select(getManyForumTopicoRespostaByForumTopicoId(this.forumTopicoId));
    this.forumTopicoRespostaSubscription$ = this.forumTopicoResposta$.subscribe(itens => {
      this.forumTopicoRespostaMany = [];
      itens.forEach(item => {
        let comentarioView = new ComentarioView();
        comentarioView.trustedHtml = this.sanitizer.bypassSecurityTrustHtml(item.descricao);
        comentarioView.forumTopicoComentario = item;
        comentarioView.usuarioFoto = item.usuarioFoto;
        comentarioView.usuarioNome = item.usuarioNome;
        this.forumTopicoRespostaMany.push(comentarioView);
        console.log("item = ", item);
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
      forumTopicoResposta.descricao = this.formConteudoResponderTopico.value ? this.formConteudoResponderTopico.value : '';
      forumTopicoResposta.forumTopicoId = this.forumTopicoId;
      forumTopicoResposta.usuarioId = this.usuarioLogado.id;

      this.store.dispatch(inserirForumTopicoResposta({ forumTopicoResposta: forumTopicoResposta }));
    }
    this.responderForumTopico();
    this.formConteudoResponderTopico.setValue('Escreva uma resposta');
  }

  alterouFormEditor(item: string) {
    this.formConteudoResponderTopico.setValue(item);
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
}
