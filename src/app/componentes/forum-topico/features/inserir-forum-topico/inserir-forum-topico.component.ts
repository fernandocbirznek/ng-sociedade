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
  getManyForumTag, 
  getOneUsuarioLogado, 
  inserirForumTopico, 
  selecionarManyForumTag
} from 'src/app/store';

import Editor from 'src/app/componentes/genericos/ckeditor/build/ckeditor';

@Component({
  selector: 'app-inserir-forum-topico',
  templateUrl: './inserir-forum-topico.component.html',
  styleUrls: ['./inserir-forum-topico.component.css']
})
export class InserirForumTopicoComponent implements OnInit {

  formGroupForumTopico: FormGroup = null as any;

  formTitulo = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  formConteudo = new FormControl('', [Validators.required, Validators.maxLength(8000)]);
  formTipoTopico = new FormControl('', [Validators.required]);

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel> = new Observable<UsuarioModel>();
  usuarioLogado: UsuarioModel | undefined = undefined ;

  forumTagManySubscription$: Subscription = new Subscription();
  forumTagMany$: Observable<ForumTagModel[]> = new Observable<ForumTagModel[]>();
  forumTagMany: ForumTagModel[] = [];

  forumTagSelect: ForumTagModel[] = [];

  readonly forumTopicoEnum = ForumTopicoEnum;

  public ckEditor = Editor;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<InserirForumTopicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { forumId: number },
    public store: Store,
  ) { 
    this.store.dispatch(selecionarManyForumTag());
  }

  ngOnInit(): void {
    this.criarFormulario();
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
    })
  }

  requestCriarForumTopico() {
    if (this.usuarioLogado && this.usuarioLogado.id > 0)  {
      let request: ForumTopicoModel = new ForumTopicoModel();
      request.titulo = this.formGroupForumTopico.get("formTitulo")?.value;
      request.descricao = this.formGroupForumTopico.get("formConteudo")?.value;
      request.forumTopicoEnum = this.formGroupForumTopico.get("formTipoTopico")?.value;
      request.usuarioId = this.usuarioLogado.id;
      request.forumTagMany = this.forumTagSelect;
      request.forumId = this.data.forumId;

      this.formGroupForumTopico.reset();
      this.forumTagSelect = [];
      this.store.dispatch(inserirForumTopico({ forumTopico: request }));
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
