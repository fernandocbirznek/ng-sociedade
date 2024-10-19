import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AdministradorHomeForumInformacaoModel,
} from '../../../../../../models';

import { 
  getOneUsuarioAdministradorHomeForumInformacao 
} from '../../../../../../store';

@Component({
  selector: 'app-informacao-geral-forum',
  templateUrl: './informacao-geral-forum.component.html',
  styleUrls: ['./informacao-geral-forum.component.css']
})
export class InformacaoGeralForumComponent implements OnInit {

  AdministradorHomeForumInformacaoModelSubscription$: Subscription = new Subscription();
  AdministradorHomeForumInformacaoModel$: Observable<AdministradorHomeForumInformacaoModel | undefined> = new Observable<AdministradorHomeForumInformacaoModel | undefined>();
  AdministradorHomeForumInformacaoModel: AdministradorHomeForumInformacaoModel | undefined = undefined ;

  constructor(
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.setupAdministradorHomeForumInformacaoModel();
  }

  ngOnDestroy() {
    this.AdministradorHomeForumInformacaoModelSubscription$.unsubscribe();
  }

  setupAdministradorHomeForumInformacaoModel() {
    this.AdministradorHomeForumInformacaoModel$ = this.store.select(getOneUsuarioAdministradorHomeForumInformacao);
    this.AdministradorHomeForumInformacaoModelSubscription$ = this.AdministradorHomeForumInformacaoModel$.subscribe(item => {
        this.AdministradorHomeForumInformacaoModel = item;
    });
  }
}
