import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import Editor from 'src/app/componentes/genericos/ckeditor/build/ckeditor';

import { 
  AulaModel, 
  AulaSessaoModel, 
  TipoSessaoAulaEnum
} from 'src/app/models';

import { 
  inserirAulaSessao 
} from 'src/app/store';

@Component({
  selector: 'app-nova-sessao',
  templateUrl: './nova-sessao.component.html',
  styleUrls: ['./nova-sessao.component.css']
})
export class NovaSessaoComponent implements OnInit {

  public ckEditor = Editor;
  @ViewChild('ckEditorTag') ckEditorTag: any;

  tipoSessao = new FormControl('', [Validators.required]);
  conteudo = new FormControl('', [Validators.required, Validators.maxLength(8000)]);
  titulo = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  formFoto = new FormControl('');

  formSessao: FormGroup = null as any;

  exemploEquacao: string = "y = 5 + \\sqrt{100} - \\sum (x+1) + \\int z \\Delta z";
  rows = 10;

  selectedFile: File | null = null;
  conteudoImagem: string = '';

  constructor(
    public dialogRef: MatDialogRef<NovaSessaoComponent>,
    public store: Store,
    @Inject(MAT_DIALOG_DATA) public data: {aula: AulaModel, sessaoMany: AulaSessaoModel[]}
  ) { }

  public ngOnInit(): void {
    this.criarFormularioSessao();
  }

  private criarFormularioSessao() {
    this.formSessao = new FormGroup({
      tipo_sessao: this.tipoSessao,
      conteudo_sessao: this.conteudo,
      titulo_sessao: this.titulo,
      formFoto: this.formFoto,
    })
  }

  public cadastrarSessao(): void {
    let conteudo: string = '';
    switch(this.formSessao.get("tipo_sessao")?.value) { 
      case "1":
      case "5":
        conteudo = this.ckEditorTag.editorInstance.getData();
        break; 
      case "2":
        conteudo = this.formSessao.get("conteudo_sessao")?.value;
        break;
      case "3":
        conteudo = this.conteudoImagem;
        break;
    } 

    let request: AulaSessaoModel = new AulaSessaoModel();
    request.titulo = this.formSessao.get("titulo_sessao")?.value;
    request.conteudo = conteudo;
    request.aulaSessaoTipo = this.tipoSessaoValue(this.formSessao.get("tipo_sessao")?.value);
    request.aulaId = this.data.aula.id;
    request.ordem = this.data.sessaoMany.length + 1;

    this.store.dispatch(inserirAulaSessao({ aulaSessao: request }))
    this.dialogRef.close();
    this.formSessao.reset();
  }

  public fecharModal() {
    this.dialogRef.close();
  }

  tipoSessaoValue(item: string): TipoSessaoAulaEnum {
    switch(item) { 
      case "1": { 
        return TipoSessaoAulaEnum.Conceito;
      } 
      case "2": { 
        return TipoSessaoAulaEnum.Equacao;
      } 
      case "3": { 
        return TipoSessaoAulaEnum.Imagem;
      } 
      case "4": { 
        return TipoSessaoAulaEnum.Video;
      } 
      case "5": { 
        return TipoSessaoAulaEnum.Texto;
      } 
      default: { 
         return TipoSessaoAulaEnum.None;
      } 
    } 
  }

  imagemAlterada(event: any) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const bytes = e.target.result.split('base64,')[1];
      this.conteudoImagem = bytes;
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}
