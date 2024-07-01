import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { 
  loginAutomaticoWhitToken,
  selecionarAreaInteresseMany, 
  selecionarManyAreaFisica,
  selecionarManyForum,
  selecionarManyForumTag,
  selecionarManyTag
} from './store';

import { 
  GenericoHelpers 
} from './componentes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sociedade-da-fisica';

  constructor(
    public store: Store,
  ) {
    this.store.dispatch(selecionarAreaInteresseMany());
    this.store.dispatch(selecionarManyAreaFisica());
    this.store.dispatch(selecionarManyTag());
    this.store.dispatch(selecionarManyForum());
    this.store.dispatch(selecionarManyForumTag());

    let token = GenericoHelpers.getToken();
    if (token)
      this.store.dispatch(loginAutomaticoWhitToken({ token: token }));
  }
}
