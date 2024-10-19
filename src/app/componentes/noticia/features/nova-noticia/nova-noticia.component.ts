import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AreaInteresseModel,
  NoticiaRequestModel, 
  UsuarioModel 
} from '../../../../models';

import { 
  getManyAreaInteresse,
  getOneUsuarioLogado, 
  inserirNoticia, 
} from '../../../../store';

@Component({
  selector: 'app-nova-noticia',
  templateUrl: './nova-noticia.component.html',
  styleUrls: ['./nova-noticia.component.css']
})
export class NovaNoticiaComponent implements OnInit {

  formGroupNoticia: FormGroup = null as any;

  formTitulo = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  formResumo = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  formConteudo = new FormControl('', [Validators.required, Validators.maxLength(8000)]);

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel | undefined> = new Observable<UsuarioModel | undefined>();
  usuarioLogado: UsuarioModel | undefined = undefined ;

  areaInteresseManySubscription$: Subscription = new Subscription();
  areaInteresseMany$: Observable<AreaInteresseModel[]> = new Observable<AreaInteresseModel[]>();
  areaInteresseMany: AreaInteresseModel[] = [];

  areaInteresseSelecionado: number[] = [];

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<NovaNoticiaComponent>,
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.setupAreaInteresse();
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

  setupAreaInteresse() {
    this.areaInteresseMany$ = this.store.select(getManyAreaInteresse);
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

  requestCriarNoticia() {
    let request: NoticiaRequestModel = new NoticiaRequestModel();
    request.titulo = this.formGroupNoticia.get("formTitulo")?.value;
    request.resumo = this.formGroupNoticia.get("formResumo")?.value;
    request.conteudo = this.formGroupNoticia.get("formConteudo")?.value;
    request.usuarioCadastroId = this.usuarioLogado!.id;
    request.areaInteresseMany = this.areaInteresseSelecionado;
    this.formGroupNoticia.reset();
    this.areaInteresseSelecionado = [];
    this.store.dispatch(inserirNoticia({ noticia: request }));
    this.dialogRef.close();
  }

  alterouFormEditor(item: string) {
    this.formConteudo.setValue(item);
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
