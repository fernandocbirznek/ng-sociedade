import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';


import { 
  HeaderComponent, FooterComponent, MecanicaUmComponent, AppRoutingModuleMecanica, MecanicaDoisComponent, 
  MecanicaTresComponent, HomeComponent, MecanicaComponent, TermodinamicaComponent, LoginCriarContaComponent,
  EquipeContatoComponent, ForumComponent, ForumMecanicaComponent, DuvidaMecanicaComponent, PerfilComponent,
  MecanicaQuatroComponent, AulaTresExercicioComponent, PerfilRoutingModule, ToastComponent, ModalExcluirComponent,
  CriarContaComponent, CriarPerfilComponent, UsuarioInformacaoComponent, PerfilProfessorRoutingModule, ProfessorHomeComponent,
  UsuarioConquistasComponent, ProfessorTabelaAulaComponent, ProfessorNovaAulaComponent, ProfessorNovaSessaoComponent, 
  ProfessorEditarSessaoComponent,
  ProfessorEditarAulaComponent,
  AulaRoutingModule,
  EditarAulaComponent,
  NovaAulaComponent
} from './componentes';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import {
  AreaFisicaStoreModule,
  AulaSessaoStoreModule,
  AulaStoreModule,
  ManipularContaModule, 
  NoticiaModule
} from './store';

import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { VisualizarAulaComponent } from './componentes/aula/features/visualizar-aula/visualizar-aula.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MecanicaComponent,
    TermodinamicaComponent,
    CriarContaComponent,
    LoginCriarContaComponent,
    EquipeContatoComponent,
    ForumComponent,
    ForumMecanicaComponent,
    DuvidaMecanicaComponent,
    PerfilComponent,
    MecanicaUmComponent,
    MecanicaDoisComponent,
    MecanicaTresComponent,
    MecanicaQuatroComponent,
    AulaTresExercicioComponent,
    ToastComponent,
    ModalExcluirComponent,
    CriarPerfilComponent,
    ProfessorHomeComponent,
    UsuarioInformacaoComponent,
    UsuarioConquistasComponent,
    ProfessorTabelaAulaComponent,
    ProfessorNovaAulaComponent,
    ProfessorNovaSessaoComponent,
    ProfessorEditarSessaoComponent,
    ProfessorEditarAulaComponent,
    NovaAulaComponent,
    EditarAulaComponent,
    VisualizarAulaComponent
  ],
  imports: [
    BrowserModule,
    CKEditorModule, 
    AppRoutingModule,
    AppRoutingModuleMecanica,
    PerfilRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    FlexLayoutModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule, 
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDatepickerModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatNativeDateModule,
    HttpClientModule,
    ManipularContaModule,
    AreaFisicaStoreModule,
    AulaStoreModule,
    AulaSessaoStoreModule,
    NoticiaModule,
    PerfilProfessorRoutingModule,
    AulaRoutingModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
