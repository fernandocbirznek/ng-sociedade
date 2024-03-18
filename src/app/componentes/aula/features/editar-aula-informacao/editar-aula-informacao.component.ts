import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AreaFisicaModel,
  AulaModel 
} from 'src/app/models';

import { 
  atualizarAula, getManyAreaFisica 
} from 'src/app/store';

@Component({
  selector: 'app-editar-aula-informacao',
  templateUrl: './editar-aula-informacao.component.html',
  styleUrls: ['./editar-aula-informacao.component.css']
})
export class EditarAulaInformacaoComponent implements OnInit {

  areaFisicaManySubscription$: Subscription = new Subscription();
  areaFisicaMany$: Observable<AreaFisicaModel[]> = new Observable<AreaFisicaModel[]>();
  areaFisicaMany: AreaFisicaModel[] = [];

  formGroupAula: FormGroup = null as any;

  formTitulo = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  formResumo = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  formAreaFisica = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<EditarAulaInformacaoComponent>,
    public store: Store,
    @Inject(MAT_DIALOG_DATA) public data: {aula: AulaModel}
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.setupAreaFisica();
    this.setupFormulario();
  }

  ngOnDestroy() {
    this.areaFisicaManySubscription$.unsubscribe();
  }

  criarFormulario() {
    this.formGroupAula = new FormGroup({
      formTitulo: this.formTitulo,
      formResumo: this.formResumo,
      formAreaFisica: this.formAreaFisica
    })
  }

  setupAreaFisica() {
    this.areaFisicaMany$ = this.store.select(getManyAreaFisica);
    this.areaFisicaManySubscription$ = this.areaFisicaMany$.subscribe(itens => {
      this.areaFisicaMany = itens;
    });
  }

  setupFormulario() {
    this.formGroupAula.get("formTitulo")!.setValue(this.data.aula.titulo);
    this.formGroupAula.get("formResumo")!.setValue(this.data.aula.resumo);
    this.formGroupAula.get("formAreaFisica")!.setValue(this.data.aula.areaFisicaId);
  }

  atualizarAulaInformacao() {
    let aula: AulaModel = new AulaModel();
    aula.titulo = this.formGroupAula.get("formTitulo")?.value;
    aula.resumo = this.formGroupAula.get("formResumo")?.value;
    aula.areaFisicaId = this.formGroupAula.get("formAreaFisica")?.value;
    aula.id = this.data.aula.id;

    this.formGroupAula.reset();
    this.store.dispatch(atualizarAula({ aula: aula }));
    this.dialogRef.close();
  }

  public fecharModal() {
    this.dialogRef.close();
  }
}
