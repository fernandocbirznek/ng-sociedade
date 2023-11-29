import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AulaModel, AulaSessaoModel } from 'src/app/models';
import { atualizarAulaSessao } from 'src/app/store';

@Component({
  selector: 'app-professor-editar-sessao',
  templateUrl: './professor-editar-sessao.component.html',
  styleUrls: ['./professor-editar-sessao.component.css']
})
export class ProfessorEditarSessaoComponent implements OnInit {

  tipoSessao = new FormControl('', [Validators.required]);
  conteudo = new FormControl('', [Validators.required, Validators.maxLength(8000)]);
  titulo = new FormControl('', [Validators.required, Validators.maxLength(200)]);

  formSessao: FormGroup = null as any;

  constructor(
    public dialogRef: MatDialogRef<ProfessorEditarSessaoComponent>,
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
      tipo_sessao: new FormControl(this.tipoSessao),
      conteudo_sessao: new FormControl(this.conteudo),
      titulo_sessao: new FormControl(this.titulo)
    })
  }

  setupEditarSessao() {
    this.formSessao.get("tipo_sessao")!.setValue(this.data.sessaoEditar.aulaSessaoTipo);
    this.formSessao.get("conteudo_sessao")!.setValue(this.data.sessaoEditar.conteudo);
    this.formSessao.get("titulo_sessao")!.setValue(this.data.sessaoEditar.titulo);
  }

  public editarSessao(): void {
    let sessao: AulaSessaoModel = {...this.data.sessaoEditar};
    sessao.conteudo = this.formSessao.get("conteudo_sessao")?.value;
    sessao.titulo = this.formSessao.get("titulo_sessao")?.value;
    sessao.aulaSessaoTipo = this.formSessao.get("tipo_sessao")?.value;

    this.store.dispatch(atualizarAulaSessao({ aulaSessao: sessao }));
    this.dialogRef.close();
  }

  public fecharModal() {
    this.dialogRef.close();
  }

}
