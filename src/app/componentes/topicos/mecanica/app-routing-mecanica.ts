import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DuvidaMecanicaComponent, ForumMecanicaComponent } from '../forum';
import { AulaTresExercicioComponent, MecanicaDoisComponent, MecanicaQuatroComponent, MecanicaTresComponent, MecanicaUmComponent } from './aulas-mecanica';

const routesMecanica: Routes = [
  { path: 'forum/mecanica', component: ForumMecanicaComponent, },
  { path: 'forum/mecanica/duvida-mecanica', component: DuvidaMecanicaComponent },
  { path: 'mecanica/aula-um', component: MecanicaUmComponent },
  { path: 'mecanica/aula-dois', component: MecanicaDoisComponent },
  { path: 'mecanica/aula-tres', component: MecanicaTresComponent },
  { path: 'mecanica/aula-tres/exercicios', component: AulaTresExercicioComponent },
  { path: 'mecanica/aula-quatro', component: MecanicaQuatroComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routesMecanica)],
  exports: [RouterModule]
})
export class AppRoutingModuleMecanica { }