import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AreaInteresseModel,
  NoticiaModel,
  NoticiaRequestModel, 
  UsuarioModel 
} from 'src/app/models';

import { 
  atualizarNoticia,
  getAreaInteresseMany,
  getOneNoticiaById,
  getOneUsuarioLogado, 
} from 'src/app/store';

import Editor from 'src/app/componentes/genericos/ckeditor/build/ckeditor';

@Component({
  selector: 'app-editar-noticia',
  templateUrl: './editar-noticia.component.html',
  styleUrls: ['./editar-noticia.component.css']
})
export class EditarNoticiaComponent implements OnInit {
  formGroupNoticia: FormGroup = null as any;

  formTitulo = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  formResumo = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  formConteudo = new FormControl('', [Validators.required, Validators.maxLength(8000)]);

  areaInteresseManySubscription$: Subscription = new Subscription();
  areaInteresseMany$: Observable<AreaInteresseModel[]> = new Observable<AreaInteresseModel[]>();
  areaInteresseMany: AreaInteresseModel[] = [];

  noticiaSubscription$: Subscription = new Subscription();
  noticia$: Observable<NoticiaModel | undefined> = new Observable<NoticiaModel | undefined>();
  noticia: NoticiaModel | undefined = undefined;

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel> = new Observable<UsuarioModel>();
  usuarioLogado: UsuarioModel | undefined = undefined ;

  areaInteresseSelecionado: number[] = [];

  public ckEditor = Editor;

  constructor(
    public dialogRef: MatDialogRef<EditarNoticiaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NoticiaModel,
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.setupAreaInteresse();
    this.setupNoticia();
    this.setupUsuarioLogado();
  }

  ngOnDestroy() {
    this.usuarioLogadoSubscription$.unsubscribe();
    this.areaInteresseManySubscription$.unsubscribe();
  }

  setupUsuarioLogado() {
    this.usuarioLogado$ = this.store.select(getOneUsuarioLogado);
    this.usuarioLogadoSubscription$ = this.usuarioLogado$.subscribe(item => {
      if(item) {
        this.usuarioLogado = item;
      }  
    });
  }

  setupNoticia() {
    this.noticia$ = this.store.select(getOneNoticiaById(this.data.id));
    this.noticiaSubscription$ = this.noticia$.subscribe(item => {
      if(item) {
        this.noticia = item;
        this.setupFormulario();
      }  
    });
  }

  setupAreaInteresse() {
    this.areaInteresseMany$ = this.store.select(getAreaInteresseMany);
    this.areaInteresseManySubscription$ = this.areaInteresseMany$.subscribe(itens => {
      this.areaInteresseMany = itens;
    });
  }

  criarFormulario() {
    this.formGroupNoticia = new FormGroup({
      formTitulo: this.formTitulo,
      formResumo: this.formResumo,
      formConteudo: this.formConteudo
    })
  }

  setupFormulario() {
    this.formGroupNoticia.get("formTitulo")!.setValue(this.noticia?.titulo);
    this.formGroupNoticia.get("formResumo")!.setValue(this.noticia?.resumo);
    this.formGroupNoticia.get("formConteudo")!.setValue(this.noticia?.conteudo);
    this.setupAreaInteresseSelecionado();
  }

  setupAreaInteresseSelecionado() {
    this.noticia?.areaInteresseMany.forEach(item => {
      this.areaInteresseSelecionado.push(item.id);
    })
  }

  requestEditarNoticia() {
    let request: NoticiaRequestModel = new NoticiaRequestModel();
    request.id = this.data.id;
    request.titulo = this.formGroupNoticia.get("formTitulo")?.value;
    request.resumo = this.formGroupNoticia.get("formResumo")?.value;
    request.conteudo = this.formGroupNoticia.get("formConteudo")?.value;
    request.usuarioCadastroId = this.usuarioLogado!.id;
    request.areaInteresseMany = this.areaInteresseSelecionado;
    this.formGroupNoticia.reset();
    this.areaInteresseSelecionado = [];
    this.store.dispatch(atualizarNoticia({ noticia: request }));
    this.dialogRef.close();
  }

  fecharModal() {
    this.dialogRef.close();
  }

  selecionouAreaInteresse(areaInteresse: AreaInteresseModel, check: any) {
    let areaInteresseSelecionado: number = 0;
    areaInteresseSelecionado = areaInteresse.id;
    if (check.checked) {
      if (!this.areaInteresseSelecionado.find(item => item == areaInteresse.id))
        this.areaInteresseSelecionado.push(areaInteresseSelecionado);
    }
    else {
      this.areaInteresseSelecionado = this.areaInteresseSelecionado.filter(item => item != areaInteresse.id);
    }
  }
}
