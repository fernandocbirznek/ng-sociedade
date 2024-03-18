import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { 
  AulaModel, 
  AulaSessaoModel, 
  TipoSessaoAulaEnum
} from 'src/app/models';

import { 
  atualizarAulaSessao 
} from 'src/app/store';

import Editor from 'src/app/componentes/genericos/ckeditor/build/ckeditor';

@Component({
  selector: 'app-editar-sessao',
  templateUrl: './editar-sessao.component.html',
  styleUrls: ['./editar-sessao.component.css']
})
export class EditarSessaoComponent implements OnInit {

  public ckEditor = Editor;

  tipoSessao = new FormControl({value: '', disabled: true}, [Validators.required]);
  titulo = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  conteudoSessao = new FormControl('', [Validators.required, Validators.maxLength(8000)]);

  formSessao: FormGroup = null as any;

  exemploEquacao: string = "y = 5 + \\sqrt{100} - \\sum (x+1) + \\int z \\Delta z";
  rows = 10;

  constructor(
    public dialogRef: MatDialogRef<EditarSessaoComponent>,
    public store: Store,
    @Inject(MAT_DIALOG_DATA) public data: {aula: AulaModel, sessaoEditar: AulaSessaoModel}
  ) { 
    this.criarFormularioSessao();
  }

  public ngOnInit(): void {
    this.setupEditarSessao();
  }

  private criarFormularioSessao() {
    this.formSessao = new FormGroup({
      tipo_sessao: this.tipoSessao,
      titulo_sessao: this.titulo,
      conteudo_sessao: this.conteudoSessao,
    })
  }

  setupEditarSessao() {
    this.formSessao.get("tipo_sessao")!.setValue(this.data.sessaoEditar.aulaSessaoTipo.toString());
    this.formSessao.get("conteudo_sessao")!.setValue(this.data.sessaoEditar.conteudo);
    this.formSessao.get("titulo_sessao")!.setValue(this.data.sessaoEditar.titulo);
  }

  public editarSessao(): void {
    let conteudo: string = '';
    switch(this.formSessao.get("tipo_sessao")?.value) { 
      case "1":
      case "5":
        conteudo = this.formSessao.get("conteudo_sessao")?.value;
        break; 
      case "2":
        conteudo = this.formSessao.get("conteudo_sessao")?.value;
        break;
   } 

    let sessao: AulaSessaoModel = {...this.data.sessaoEditar};

    sessao.conteudo = conteudo;
    sessao.titulo = this.formSessao.get("titulo_sessao")?.value;
    sessao.aulaSessaoTipo = this.tipoSessaoValue(this.formSessao.get("tipo_sessao")?.value);

    this.store.dispatch(atualizarAulaSessao({ aulaSessao: sessao }));
    this.dialogRef.close();
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
        return TipoSessaoAulaEnum.Imagem;
      } 
      case "3": { 
        return TipoSessaoAulaEnum.Equacao;
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
}
