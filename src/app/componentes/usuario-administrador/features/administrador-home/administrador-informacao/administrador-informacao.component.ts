import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AdministradorHomeAulaInformacaoModel,
} from 'src/app/models';
import { getOneUsuarioAdministradorHomeAulaInformacao } from 'src/app/store';

@Component({
  selector: 'app-administrador-informacao',
  templateUrl: './administrador-informacao.component.html',
  styleUrls: ['./administrador-informacao.component.css']
})
export class AdministradorInformacaoComponent implements OnInit {

  AdministradorHomeAulaInformacaoModelSubscription$: Subscription = new Subscription();
  AdministradorHomeAulaInformacaoModel$: Observable<AdministradorHomeAulaInformacaoModel | undefined> = new Observable<AdministradorHomeAulaInformacaoModel | undefined>();
  AdministradorHomeAulaInformacaoModel: AdministradorHomeAulaInformacaoModel | undefined = undefined ;

  constructor(
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.setupAdministradorHomeAulaInformacaoModel();
  }

  ngOnDestroy() {
    this.AdministradorHomeAulaInformacaoModelSubscription$.unsubscribe();
  }

  setupAdministradorHomeAulaInformacaoModel() {
    this.AdministradorHomeAulaInformacaoModel$ = this.store.select(getOneUsuarioAdministradorHomeAulaInformacao);
    this.AdministradorHomeAulaInformacaoModelSubscription$ = this.AdministradorHomeAulaInformacaoModel$.subscribe(item => {
        this.AdministradorHomeAulaInformacaoModel = item;
    });
  }

}
