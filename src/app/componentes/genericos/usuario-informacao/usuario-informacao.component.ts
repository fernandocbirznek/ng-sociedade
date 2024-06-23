import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  InformacaoWidgetAlunoViewModel,
  InformacaoAulaViewModel, 
  InformacaoNoticiaViewModel, 
  TipoUsuarioEnum, 
  UsuarioModel, 
  InformacaoAulaAlunoViewModel
} from 'src/app/models';

import { 
  getOneInformacaoAlunoWidget,
  getOneInformacaoAulaAluno,
  getProfessorInformacaoAulaMany, 
  getProfessorInformacaoNoticiaMany
} from 'src/app/store';

@Component({
  selector: 'app-usuario-informacao',
  templateUrl: './usuario-informacao.component.html',
  styleUrls: ['./usuario-informacao.component.css']
})
export class UsuarioInformacaoComponent implements OnInit {
  @Input() usuarioLogado: UsuarioModel = new UsuarioModel();

  alunoInformacaoWidgetSubscription$: Subscription = new Subscription();
  alunoInformacaoWidget$: Observable<InformacaoWidgetAlunoViewModel> = new Observable<InformacaoWidgetAlunoViewModel>();
  alunoInformacaoWidget: InformacaoWidgetAlunoViewModel = new InformacaoWidgetAlunoViewModel();

  alunoInformacaoAulaSubscription$: Subscription = new Subscription();
  alunoInformacaoAula$: Observable<InformacaoAulaAlunoViewModel> = new Observable<InformacaoAulaAlunoViewModel>();
  alunoInformacaoAula: InformacaoAulaAlunoViewModel = new InformacaoAulaAlunoViewModel();

  professorInformacaoAulaSubscription$: Subscription = new Subscription();
  professorInformacaoAula$: Observable<InformacaoAulaViewModel> = new Observable<InformacaoAulaViewModel>();
  professorInformacaoAula: InformacaoAulaViewModel = new InformacaoAulaViewModel();

  professorInformacaoNoticiaSubscription$: Subscription = new Subscription();
  professorInformacaoNoticia$: Observable<InformacaoNoticiaViewModel> = new Observable<InformacaoNoticiaViewModel>();
  professorInformacaoNoticia: InformacaoNoticiaViewModel = new InformacaoNoticiaViewModel();

  readonly tipoUsuarioEnum = TipoUsuarioEnum;

  constructor(
    public store: Store,
  ) { }

  ngOnInit(): void {
    switch (this.usuarioLogado.tipoUsuario) {
      case this.tipoUsuarioEnum.UsuarioComum:
        this.setupAlunoInformacao();
        break;

      case this.tipoUsuarioEnum.UsuarioProfessor:
        this.setupProfessorInformacao();
        break;
    }
  }

  setupAlunoInformacao() {
    this.setupAlunoInformacaoAula();
    this.setupAlunoInformacaoWidget();
  }

  setupProfessorInformacao() {
    this.setupProfessorInformacaoAula();
    this.setupProfessorInformacaoNoticia();
  }

  ngOnDestroy() {
    this.alunoInformacaoAulaSubscription$.unsubscribe();
    this.alunoInformacaoWidgetSubscription$.unsubscribe();
    this.professorInformacaoAulaSubscription$.unsubscribe();
    this.professorInformacaoNoticiaSubscription$.unsubscribe();
  }

  setupAlunoInformacaoAula() {
    this.alunoInformacaoAula$ = this.store.select(getOneInformacaoAulaAluno);
    this.alunoInformacaoAulaSubscription$ = this.alunoInformacaoAula$.subscribe(item => {
      this.alunoInformacaoAula = item;
    });
  }

  setupAlunoInformacaoWidget() {
    this.alunoInformacaoWidget$ = this.store.select(getOneInformacaoAlunoWidget);
    this.alunoInformacaoWidgetSubscription$ = this.alunoInformacaoWidget$.subscribe(item => {
      this.alunoInformacaoWidget = item;
    });
  }

  setupProfessorInformacaoAula() {
    this.professorInformacaoAula$ = this.store.select(getProfessorInformacaoAulaMany(this.usuarioLogado.id));
    this.professorInformacaoAulaSubscription$ = this.professorInformacaoAula$.subscribe(item => {
      this.professorInformacaoAula = item;
    });
  }

  setupProfessorInformacaoNoticia() {
    this.professorInformacaoNoticia$ = this.store.select(getProfessorInformacaoNoticiaMany(this.usuarioLogado.id));
    this.professorInformacaoNoticiaSubscription$ = this.professorInformacaoNoticia$.subscribe(item => {
      this.professorInformacaoNoticia = item;
    });
  }
}
