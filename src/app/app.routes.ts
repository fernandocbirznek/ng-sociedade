import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
  EquipeContatoComponent, 
  ForumComponent,
  HomeComponent, 
} from './componentes';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'equipe-contato', component: EquipeContatoComponent },
  { path: 'forum', component: ForumComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
