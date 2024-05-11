import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { 
  selecionarAreaInteresseMany 
} from './store';

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
  }
}
