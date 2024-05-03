import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  ForumTopicoRespostaModel, 
  UsuarioModel 
} from 'src/app/models';

import { 
  atualizarForumTopicoResposta, 
  getOneUsuarioLogado 
} from 'src/app/store';

import Editor from 'src/app/componentes/genericos/ckeditor/build/ckeditor';

@Component({
  selector: 'app-atualizar-forum-topico-resposta',
  templateUrl: './atualizar-forum-topico-resposta.component.html',
  styleUrls: ['./atualizar-forum-topico-resposta.component.css']
})
export class AtualizarForumTopicoRespostaComponent implements OnInit {

  formGroupForumTopicoResposta: FormGroup = null as any;

  formConteudoResposta = new FormControl('', [Validators.required, Validators.maxLength(8000)]);

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel> = new Observable<UsuarioModel>();
  usuarioLogado: UsuarioModel | undefined = undefined ;

  public ckEditor = Editor;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AtualizarForumTopicoRespostaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { forumTopicoResposta: ForumTopicoRespostaModel },
    public store: Store,
  ) { }

  ngOnInit(): void {
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
    this.formGroupForumTopicoResposta = new FormGroup({
      formConteudoResposta: this.formConteudoResposta,
    });
  }

  setupFormulario() {
    this.formGroupForumTopicoResposta.get("formConteudoResposta")!.setValue(this.data.forumTopicoResposta.descricao);
  }

  requestAtualizarForumTopico() {
    if (this.usuarioLogado)  {
      let request: ForumTopicoRespostaModel = new ForumTopicoRespostaModel();
      request.id = this.data.forumTopicoResposta.id;
      request.descricao = this.formGroupForumTopicoResposta.get("formConteudoResposta")?.value;
      request.usuarioId = this.usuarioLogado.id;
      request.dataCadastro = this.data.forumTopicoResposta.dataCadastro;
      request.forumTopicoId = this.data.forumTopicoResposta.forumTopicoId;

      this.formGroupForumTopicoResposta.reset();

      this.store.dispatch(atualizarForumTopicoResposta({ forumTopicoResposta: request }));
      this.dialogRef.close();
    }
  }

  fecharModal() {
    this.dialogRef.close();
  }
}
