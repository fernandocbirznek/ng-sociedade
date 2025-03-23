import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AulaViewModel, 
  UsuarioModel
} from '../../../../../models';

import { 
  atualizarAulaAnterior,
  atualizarAulaPosterior,
  getManyAulaForEditarAulaSelectByAreaFisicaId 
} from '../../../../../store';

@Component({
  selector: 'app-editar-aula-posterior-anterior',
  templateUrl: './editar-aula-posterior-anterior.component.html',
  styleUrls: ['./editar-aula-posterior-anterior.component.css']
})
export class EditarAulaPosteriorAnteriorComponent implements OnInit {
  @Input() aulaSessaoLength: number = 0;
  @Input() aula: AulaViewModel = new AulaViewModel();
  @Input() usuarioLogado: UsuarioModel = UsuarioModel.create({});

  @Output() onNovaSessao = new EventEmitter();

  aulaManySubscription$: Subscription = new Subscription();
  aulaMany$: Observable<AulaViewModel[]> = new Observable<AulaViewModel[]>();
  aulaManyOriginal: AulaViewModel[] = [];

  formAulaPosteriorAnterior: FormGroup = null as any;

  aulaAnteriorSelectFormControl = new FormControl();
  aulaManyAnterior: AulaViewModel[] = [];
  isFormAulaAnteriorValid: boolean = false;

  aulaPosteriorSelectFormControl = new FormControl();
  aulaManyPosterior: AulaViewModel[] = [];
  isFormAulaPosteriorValid: boolean = false;

  constructor(
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.setupAulaMany();
    this.criarFormulario();
    this.setupAulaAnteriorPosterior();
  }

  ngOnDestroy(): void {
    this.aulaManySubscription$.unsubscribe();
  }

  setupAulaAnteriorPosterior() {
    this.aulaAnteriorSelectFormControl.setValue(this.aula.aulaAnteriorId);
    this.aulaPosteriorSelectFormControl.setValue(this.aula.aulaPosteriorId);
  }

  setupAulaMany() {
    this.aulaMany$ = this.store.select(getManyAulaForEditarAulaSelectByAreaFisicaId(this.usuarioLogado.id, this.aula.areaFisicaId));
    this.aulaManySubscription$ = this.aulaMany$.subscribe(itens => {
      this.aulaManyOriginal = 
        itens
          .filter(item => item.id != this.aula.id);

      this.aulaManyAnterior = 
        this.aulaManyOriginal
          .filter(item => item.id != this.aula.aulaPosteriorId);

      this.aulaManyPosterior = 
        this.aulaManyOriginal
          .filter(item => item.id != this.aula.aulaAnteriorId);
    });
  }

  private criarFormulario() {
    this.formAulaPosteriorAnterior = new FormGroup({
      aula_anterior: this.aulaAnteriorSelectFormControl,
      aula_posterior: this.aulaPosteriorSelectFormControl,
    })
  }

  novaSessao() {
    this.onNovaSessao.emit();
  }

  alterarAulaAnterior() {
    if (this.aulaAnteriorSelectFormControl.value || this.aulaAnteriorSelectFormControl.value == 0) {
      let request: AulaViewModel = new AulaViewModel();
      request.id = this.aula.id;
      request.aulaAnteriorId = this.aulaAnteriorSelectFormControl.value;

      this.store.dispatch(atualizarAulaAnterior({ aula: request }));
      this.isFormAulaAnteriorValid = false;
    }
  }

  alterouAulaAnteriorSelect() {
    this.selectAlterar();
    this.formAulaAnteriorValid();
  }

  alterarAulaPosterior() {
    if (this.aulaPosteriorSelectFormControl.value || this.aulaPosteriorSelectFormControl.value == 0) {
      let request: AulaViewModel = new AulaViewModel();
      request.id = this.aula.id;
      request.aulaPosteriorId = this.aulaPosteriorSelectFormControl.value;

      this.store.dispatch(atualizarAulaPosterior({ aula: request }));
      this.isFormAulaPosteriorValid = false;
    }
  }

  alterouAulaPosteriorSelect() {
    this.selectAlterar();
    this.formAulaPosteriorValid();
  }

  formAulaAnteriorValid() {
    if (this.aulaAnteriorSelectFormControl.value != this.aula.aulaAnteriorId)
      this.isFormAulaAnteriorValid = true;
    else
      this.isFormAulaAnteriorValid = false;
  }

  formAulaPosteriorValid() {
    if (this.aulaPosteriorSelectFormControl.value != this.aula.aulaPosteriorId)
      this.isFormAulaPosteriorValid = true;
    else
      this.isFormAulaPosteriorValid = false;
  }

  selectAlterar() {
    this.aulaManyAnterior = 
        this.aulaManyOriginal
          .filter(item => item.id != this.aulaPosteriorSelectFormControl.value);

    this.aulaManyPosterior = 
        this.aulaManyOriginal
          .filter(item => item.id != this.aulaAnteriorSelectFormControl.value);
  }
}
