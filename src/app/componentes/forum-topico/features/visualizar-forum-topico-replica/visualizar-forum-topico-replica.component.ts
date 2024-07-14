import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AtualizarForumTopicoReplicaComponent,
  ModalExcluirComponent
} from 'src/app/componentes';

import { 
  ComentarioView,
  ForumTopicoReplicaModel, 
  UsuarioModel
} from 'src/app/models';

import { 
  excluirForumTopicoReplica, 
  getManyForumTopicoReplicaByForumTopicoRespostaId,
  getOneUsuarioLogado,
  inserirForumTopicoReplica
} from 'src/app/store';

import Editor from 'src/app/componentes/genericos/ckeditor/build/ckeditor';

@Component({
  selector: 'app-visualizar-forum-topico-replica',
  templateUrl: './visualizar-forum-topico-replica.component.html',
  styleUrls: ['./visualizar-forum-topico-replica.component.css']
})
export class VisualizarForumTopicoReplicaComponent implements OnInit {
  @Input() forumTopicoId: number = 0;
  @Input() forumTopicoRespostaId: number = 0;

  forumTopicoReplicaSubscription$: Subscription = new Subscription();
  forumTopicoReplica$: Observable<ForumTopicoReplicaModel[]> = new Observable<ForumTopicoReplicaModel[]>();
  forumTopicoReplicaMany: ComentarioView[] = [];

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel | undefined> = new Observable<UsuarioModel | undefined>();
  usuarioLogado: UsuarioModel | undefined = undefined ;

  public ckEditor = Editor;

  formConteudoReplicaTopico = new FormControl('', [Validators.required, Validators.maxLength(8000)]);

  isReplicaTopico: boolean = false;

  constructor(
    public store: Store,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.setupForumTopicoReplica();
    this.setupUsuarioLogado();

    this.formConteudoReplicaTopico.setValue('Escreva uma replica');
  }

  ngOnDestroy() {
    this.forumTopicoReplicaSubscription$.unsubscribe();
    this.usuarioLogadoSubscription$.unsubscribe();
  }

  setupForumTopicoReplica() {
    this.forumTopicoReplica$ = this.store.select(getManyForumTopicoReplicaByForumTopicoRespostaId(this.forumTopicoRespostaId));
    this.forumTopicoReplicaSubscription$ = this.forumTopicoReplica$.subscribe(itens => {
      this.forumTopicoReplicaMany = [];
      itens.forEach(item => {
        let comentarioView = new ComentarioView();
        comentarioView.trustedHtml = this.sanitizer.bypassSecurityTrustHtml(item.descricao);
        comentarioView.forumTopicoReplicaComentario = item;
        this.forumTopicoReplicaMany.push(comentarioView);
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

  replicaForumTopico() {
    this.isReplicaTopico = !this.isReplicaTopico;
  }

  requestReplicaForumTopico() {
    if (this.usuarioLogado && this.usuarioLogado.id > 0) {
      let forumTopicoReplica = new ForumTopicoReplicaModel();
      forumTopicoReplica.descricao = this.formConteudoReplicaTopico.value;
      forumTopicoReplica.forumTopicoId = this.forumTopicoId;
      forumTopicoReplica.usuarioId = this.usuarioLogado.id;
      forumTopicoReplica.forumTopicoRespostaId = this.forumTopicoRespostaId;

      this.store.dispatch(inserirForumTopicoReplica({ forumTopicoReplica: forumTopicoReplica }));
    }
  }

  editarReplicaForumTopico(item: any) {
    this.dialog.open(AtualizarForumTopicoReplicaComponent, {
      data: { forumTopicoReplica: item }
    });
  }

  excluirReplicaForumTopico(item: any) {
    this.dialog.open(ModalExcluirComponent, {
      data: `Replica`
    }).afterClosed().subscribe((evento) => {
      if(evento) {
        this.store.dispatch(excluirForumTopicoReplica({ forumTopicoReplicaId: item.id }));
      }
    });
  }

}
