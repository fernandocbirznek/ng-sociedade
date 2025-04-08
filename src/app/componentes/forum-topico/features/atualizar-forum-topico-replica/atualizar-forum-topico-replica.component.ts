import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  ForumTopicoReplicaModel, 
  UsuarioModel 
} from '../../../../models';

import { 
  atualizarForumTopicoReplica, 
  getOneUsuarioLogado 
} from '../../../../store';

@Component({
  selector: 'app-atualizar-forum-topico-replica',
  templateUrl: './atualizar-forum-topico-replica.component.html',
  styleUrls: ['./atualizar-forum-topico-replica.component.css']
})
export class AtualizarForumTopicoReplicaComponent implements OnInit {

  formGroupForumTopicoReplica: FormGroup = null as any;

  formConteudoReplica = new FormControl('', [Validators.required, Validators.maxLength(8000)]);

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel | undefined> = new Observable<UsuarioModel | undefined>();
  usuarioLogado: UsuarioModel | undefined = undefined ;

  conteudoRecebido: string = '';

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AtualizarForumTopicoReplicaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { forumTopicoReplica: ForumTopicoReplicaModel },
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.conteudoRecebido = this.data.forumTopicoReplica.descricao;
    this.criarFormulario();
    this.setupFormulario();
    this.setupUsuarioLogado();
  }

  ngOnDestroy() {
    this.usuarioLogadoSubscription$.unsubscribe();
  }

  setupUsuarioLogado() {
    this.usuarioLogado$ = this.store.select(getOneUsuarioLogado);
    this.usuarioLogadoSubscription$ = this.usuarioLogado$.subscribe(item => {
      if(item) {
        this.usuarioLogado = item;
      }  
    });
  }

  criarFormulario() {
    this.formGroupForumTopicoReplica = new FormGroup({
      formConteudoReplica: this.formConteudoReplica,
    });
  }

  setupFormulario() {
    this.formGroupForumTopicoReplica.get("formConteudoReplica")!.setValue(this.data.forumTopicoReplica.descricao);
  }

  requestAtualizarForumTopico() {
    if (this.usuarioLogado && this.usuarioLogado.id > 0)  {
      let request: ForumTopicoReplicaModel = ForumTopicoReplicaModel.create({
        id: this.data.forumTopicoReplica.id,
        descricao: this.formGroupForumTopicoReplica.get("formConteudoReplica")?.value,
        usuarioId: this.usuarioLogado.id,
        dataCadastro: this.data.forumTopicoReplica.dataCadastro,
        forumTopicoId: this.data.forumTopicoReplica.forumTopicoId
      });

      this.formGroupForumTopicoReplica.reset();

      this.store.dispatch(atualizarForumTopicoReplica({ forumTopicoReplica: request }));
      this.dialogRef.close();
    }
  }

  alterouFormEditor(item: string) {
    this.formConteudoReplica.setValue(item);
  }

  fecharModal() {
    this.dialogRef.close();
  }

}
