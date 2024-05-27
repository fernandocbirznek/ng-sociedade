import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipeContatoComponent, ForumComponent,
        HomeComponent, MecanicaComponent, PerfilComponent
} from './componentes';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mecanica', component: MecanicaComponent },
  { path: 'equipe-contato', component: EquipeContatoComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'perfil', component: PerfilComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
