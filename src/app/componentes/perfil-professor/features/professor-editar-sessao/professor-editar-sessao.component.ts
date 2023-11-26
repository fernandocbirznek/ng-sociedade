import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

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
    public dialog: MatDialogRef<ProfessorEditarSessaoComponent>,
  ) { }

  public ngOnInit(): void {
    this.criarFormularioSessao();
  }

  private criarFormularioSessao() {
    this.formSessao = new FormGroup({
      tipo_sessao: new FormControl(this.tipoSessao),
      conteudo_sessao: new FormControl(this.conteudo),
      titulo_sessao: new FormControl(this.titulo)
    })
  }

  public editarSessao(): void {
  }

  public fecharModal() {
    this.dialog.close();
  }

}
