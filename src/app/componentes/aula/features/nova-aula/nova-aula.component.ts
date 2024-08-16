import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AreaFisicaModel,
  AulaModel, 
  AulaViewModel, 
  UsuarioModel 
} from 'src/app/models';

import { 
  getManyAreaFisica,
  getOneUsuarioLogado, 
  inserirAula, 
} from 'src/app/store';

@Component({
  selector: 'app-nova-aula',
  templateUrl: './nova-aula.component.html',
  styleUrls: ['./nova-aula.component.css']
})
export class NovaAulaComponent implements OnInit {

  formGroupAula: FormGroup = null as any;

  formTitulo = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  formResumo = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  formAreaFisica = new FormControl('', [Validators.required]);

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel | undefined> = new Observable<UsuarioModel | undefined>();
  usuarioLogado: UsuarioModel | undefined = undefined ;

  areaFisicaManySubscription$: Subscription = new Subscription();
  areaFisicaMany$: Observable<AreaFisicaModel[]> = new Observable<AreaFisicaModel[]>();
  areaFisicaMany: AreaFisicaModel[] = [];

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<NovaAulaComponent>,
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.setupAreaFisica();
    this.setupUsuarioLogado();
  }

  ngOnDestroy() {
    this.usuarioLogadoSubscription$.unsubscribe();
    this.areaFisicaManySubscription$.unsubscribe();
  }

  setupUsuarioLogado() {
    this.usuarioLogado$ = this.store.select(getOneUsuarioLogado);
    this.usuarioLogadoSubscription$ = this.usuarioLogado$.subscribe(item => {
      if(item) {
        this.usuarioLogado = item;
      }  
    });
  }

  setupAreaFisica() {
    this.areaFisicaMany$ = this.store.select(getManyAreaFisica);
    this.areaFisicaManySubscription$ = this.areaFisicaMany$.subscribe(itens => {
      this.areaFisicaMany = itens;
    });
  }

  criarFormulario() {
    this.formGroupAula = new FormGroup({
      formTitulo: this.formTitulo,
      formResumo: this.formResumo,
      formAreaFisica: this.formAreaFisica
    });

    this.formAreaFisica.setValue('1');
  }

  requestCriarAula() {
    let request: AulaViewModel = new AulaViewModel();
    request.titulo = this.formGroupAula.get("formTitulo")?.value;
    request.resumo = this.formGroupAula.get("formResumo")?.value;
    request.areaFisicaId = this.formGroupAula.get("formAreaFisica")?.value;
    request.professorId = this.usuarioLogado!.id;
    this.formGroupAula.reset();
    this.store.dispatch(inserirAula({ aula: request }))
    this.dialogRef.close();
  }

  fecharModal() {
    this.dialogRef.close();
  }
}
