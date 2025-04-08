import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AtualizarForumTopicoReplicaComponent,
  ModalExcluirComponent
} from '../../../../componentes';

import { 
  ComentarioView,
  ForumTopicoReplicaModel, 
  UsuarioModel
} from '../../../../models';

import { 
  excluirForumTopicoReplica, 
  getManyForumTopicoReplicaByForumTopicoRespostaId,
  getOneUsuarioLogado,
  inserirForumTopicoReplica
} from '../../../../store';

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
        let comentarioView = ComentarioView.create({
          trustedHtml: this.sanitizer.bypassSecurityTrustHtml(item.descricao),
          forumTopicoReplicaComentario: item,
          usuarioFoto: item.usuarioFoto,
          usuarioNome: item.usuarioNome
        });

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
      let forumTopicoReplica = ForumTopicoReplicaModel.create({
        descricao: this.formConteudoReplicaTopico.value ? this.formConteudoReplicaTopico.value : '',
        forumTopicoId: this.forumTopicoId,
        usuarioId: this.usuarioLogado.id,
        forumTopicoRespostaId: this.forumTopicoRespostaId
      });

      this.store.dispatch(inserirForumTopicoReplica({ forumTopicoReplica: forumTopicoReplica }));
    }
  }

  alterouFormEditor(item: string) {
    this.formConteudoReplicaTopico.setValue(item);
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
