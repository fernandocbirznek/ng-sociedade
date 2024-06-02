import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  InformacaoAulaViewModel, 
  InformacaoNoticiaViewModel, 
  UsuarioModel 
} from 'src/app/models';

import { 
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

  professorInformacaoAulaSubscription$: Subscription = new Subscription();
  professorInformacaoAula$: Observable<InformacaoAulaViewModel> = new Observable<InformacaoAulaViewModel>();
  professorInformacaoAula: InformacaoAulaViewModel = new InformacaoAulaViewModel();

  professorInformacaoNoticiaSubscription$: Subscription = new Subscription();
  professorInformacaoNoticia$: Observable<InformacaoNoticiaViewModel> = new Observable<InformacaoNoticiaViewModel>();
  professorInformacaoNoticia: InformacaoNoticiaViewModel = new InformacaoNoticiaViewModel();

  constructor(
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.setupProfessorInformacaoAula();
    this.setupProfessorInformacaoNoticia();
  }

  ngOnDestroy() {
    this.professorInformacaoAulaSubscription$.unsubscribe();
    this.professorInformacaoNoticiaSubscription$.unsubscribe();
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
