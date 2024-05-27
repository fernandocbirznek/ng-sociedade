import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { 
  ForumTagModel,
  ForumTopicoEnum,
  ForumTopicoModel,
  UsuarioModel 
} from 'src/app/models';

import { 
  atualizarForumTopico,
  getManyForumTag, 
  getOneUsuarioLogado, 
  selecionarManyForumTag
} from 'src/app/store';

import Editor from 'src/app/componentes/genericos/ckeditor/build/ckeditor';
@Component({
  selector: 'app-atualizar-forum-topico',
  templateUrl: './atualizar-forum-topico.component.html',
  styleUrls: ['./atualizar-forum-topico.component.css']
})
export class AtualizarForumTopicoComponent implements OnInit {

  formGroupForumTopico: FormGroup = null as any;

  formTitulo = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  formConteudo = new FormControl('', [Validators.required, Validators.maxLength(8000)]);
  formTipoTopico = new FormControl('', [Validators.required]);

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel | undefined> = new Observable<UsuarioModel | undefined>();
  usuarioLogado: UsuarioModel | undefined = undefined ;

  forumTagManySubscription$: Subscription = new Subscription();
  forumTagMany$: Observable<ForumTagModel[]> = new Observable<ForumTagModel[]>();
  forumTagMany: ForumTagModel[] = [];

  forumTagSelect: ForumTagModel[] = [];
  forumTagSelectId: number[] = [];

  readonly forumTopicoEnum = ForumTopicoEnum;

  public ckEditor = Editor;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AtualizarForumTopicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { forumTopico: ForumTopicoModel },
    public store: Store,
  ) { 
    this.store.dispatch(selecionarManyForumTag());
  }

  ngOnInit(): void {
    this.criarFormulario();
    this.setupFormulario();
    this.setupForumTag();
    this.setupUsuarioLogado();
  }

  ngOnDestroy() {
    this.usuarioLogadoSubscription$.unsubscribe();
    this.forumTagManySubscription$.unsubscribe();
  }

  setupUsuarioLogado() {
    this.usuarioLogado$ = this.store.select(getOneUsuarioLogado);
    this.usuarioLogadoSubscription$ = this.usuarioLogado$.subscribe(item => {
      if(item) {
        this.usuarioLogado = item;
      }  
    });
  }

  setupForumTag() {
    this.forumTagMany$ = this.store.select(getManyForumTag);
    this.forumTagManySubscription$ = this.forumTagMany$.subscribe(itens => {
      this.forumTagMany = itens;
    });
  }

  criarFormulario() {
    this.formGroupForumTopico = new FormGroup({
      formTitulo: this.formTitulo,
      formConteudo: this.formConteudo,
      formTipoTopico: this.formTipoTopico
    });
  }

  setupFormulario() {
    this.formGroupForumTopico.get("formTitulo")!.setValue(this.data.forumTopico.titulo);
    this.formGroupForumTopico.get("formConteudo")!.setValue(this.data.forumTopico.descricao);
    this.formGroupForumTopico.get("formTipoTopico")!.setValue(this.data.forumTopico.forumTopicoEnum);
    this.setupForumTagSelecionado();
  }

  setupForumTagSelecionado() {
    this.data.forumTopico.forumTagMany.forEach(item => {
      this.forumTagSelect.push(item);
      this.forumTagSelectId.push(item.id);
    })
  }

  requestCriarForumTopico() {
    if (this.usuarioLogado && this.usuarioLogado.id > 0)  {
      let request: ForumTopicoModel = new ForumTopicoModel();
      request.id = this.data.forumTopico.id;
      request.titulo = this.formGroupForumTopico.get("formTitulo")?.value;
      request.descricao = this.formGroupForumTopico.get("formConteudo")?.value;
      request.forumTopicoEnum = this.formGroupForumTopico.get("formTipoTopico")?.value;
      request.usuarioId = this.usuarioLogado.id;
      request.dataCadastro = this.data.forumTopico.dataCadastro;
      request.forumTagMany = this.forumTagSelect;
      request.forumId = this.data.forumTopico.forumId;

      this.formGroupForumTopico.reset();
      this.forumTagSelect = [];
      this.store.dispatch(atualizarForumTopico({ forumTopico: request }));
      this.dialogRef.close();
    }
    
  }

  fecharModal() {
    this.dialogRef.close();
  }

  selecionouForumTag(forumTag: ForumTagModel, check: any) {
    if (check.checked) {
      if (!this.forumTagSelect.find(item => item.id == forumTag.id))
        this.forumTagSelect.push(forumTag);
    }
    else {
      this.forumTagSelect = this.forumTagSelect.filter(item => item.id != forumTag.id);
    }
  }
}
