import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { 
  loginAutomaticoWhitToken,
  selecionarAreaInteresseMany 
} from './store';
import { GenericoHelpers } from './componentes';

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

    let token = GenericoHelpers.getToken();
    if (token)
      this.store.dispatch(loginAutomaticoWhitToken({ token: token }));
  }
}
