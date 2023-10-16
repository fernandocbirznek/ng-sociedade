import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DuvidaMecanicaComponent, EquipeContatoComponent, ForumComponent, ForumMecanicaComponent, 
        HomeComponent, MecanicaComponent, PerfilComponent, TermodinamicaComponent 
} from './componentes';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mecanica', component: MecanicaComponent },
  { path: 'termodinamica', component: TermodinamicaComponent },
  { path: 'equipe-contato', component: EquipeContatoComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'perfil', component: PerfilComponent },
  //{ path: 'forum/mecanica', component: ForumMecanicaComponent, },
  //{ path: 'forum/mecanica/duvida-mecanica', component: DuvidaMecanicaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
