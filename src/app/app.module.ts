import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio'
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


import { 
  HeaderComponent, FooterComponent, MecanicaUmComponent, AppRoutingModuleMecanica, MecanicaDoisComponent, 
  MecanicaTresComponent, HomeComponent, MecanicaComponent, LoginCriarContaComponent,
  EquipeContatoComponent, ForumComponent, PerfilComponent,
  MecanicaQuatroComponent, AulaTresExercicioComponent, PerfilRoutingModule, ToastComponent, ModalExcluirComponent,
  CriarContaComponent, CriarPerfilComponent, UsuarioInformacaoComponent, PerfilProfessorRoutingModule, ProfessorHomeComponent,
  UsuarioConquistasComponent, ProfessorTabelaAulaComponent,
  NovaSessaoComponent,
  AulaRoutingModule,
  EditarAulaComponent,
  NovaAulaComponent,
  VisualizarAulaComponent,
  EditarAulaInformacaoComponent,
  NovaNoticiaComponent,
  ProfessorTabelaNoticiaComponent,
  EditarNoticiaComponent,
  EditarSessaoComponent,
  ProfessorPerfilVisualizarComponent,
  AulaIconeComponent,
  ProfessorPerfilVisualizarCardAulaComponent,
  ProfessorPerfilVisualizarCardNoticiaComponent,
  VisualizarNoticiaComponent,
  ProfessorEditarPerfilComponent,
  UsuarioAreaInteresseComponent,
  EditarUsuarioAreaInteresseComponent,
  AlunoAulaComponent,
  AlunoHomeComponent,
  AlunoRoutingModule,
  EditarAulaComentarioComponent,
  AlunoFavoritadoComponent,
  AdministradorHomeComponent,
  AdministradorRoutingModule,
  ForumTopicoRoutingModule,
  NoticiaRoutingModule,
  AdministradorTabelaAlunoComponent,
  AdministradorTabelaProfessorComponent,
  AdministradorModalCriarUsuarioComponent,
  AdministradorAlterarUsuarioComponent,
  AlunoVisualizarComponent,
  AdministradorTabelaAulaComponent,
  AdministradorTabelaNoticiaComponent,
  ForumTopicoComponent,
  InserirForumTopicoComponent,
  VisualizarForumTopicoComponent,
  AtualizarForumTopicoComponent,
  AtualizarForumTopicoRespostaComponent,
  AtualizarForumTopicoReplicaComponent,
  PainelNoticiaComponent,
  AulaFiltroComponent
} from './componentes';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { KatexModule } from 'ng-katex';

import {
  AreaFisicaStoreModule,
  AreaFisicaDivisaoStoreModule,
  AreaInteresseStoreModule,
  AulaComentarioStoreModule,
  AulaSessaoStoreModule,
  AulaStoreModule,
  ForumStoreModule,
  ForumTagStoreModule,
  ForumTopicoStoreModule,
  ForumTopicoReplicaStoreModule,
  ForumTopicoRespostaStoreModule,
  HeaderStoreModule,
  ManipularContaModule, 
  NoticiaModule,
  TagStoreModule,
  UsuarioModule,
  UsuarioAulaSessaoFavoritadoModule,
  WidgetModule,
} from './store';

import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MecanicaComponent,
    CriarContaComponent,
    LoginCriarContaComponent,
    EquipeContatoComponent,
    ForumComponent,
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
    NovaAulaComponent,
    EditarAulaComponent,
    VisualizarAulaComponent,
    NovaSessaoComponent,
    EditarSessaoComponent,
    EditarAulaInformacaoComponent,
    NovaNoticiaComponent,
    ProfessorTabelaNoticiaComponent,
    EditarNoticiaComponent,
    ProfessorPerfilVisualizarComponent,
    AulaIconeComponent,
    ProfessorPerfilVisualizarCardAulaComponent,
    ProfessorPerfilVisualizarCardNoticiaComponent,
    VisualizarNoticiaComponent,
    ProfessorEditarPerfilComponent,
    UsuarioAreaInteresseComponent,
    EditarUsuarioAreaInteresseComponent,
    AlunoHomeComponent,
    AlunoAulaComponent,
    EditarAulaComentarioComponent,
    AlunoFavoritadoComponent,
    AdministradorHomeComponent,
    AdministradorTabelaAlunoComponent,
    AdministradorTabelaProfessorComponent,
    AdministradorModalCriarUsuarioComponent,
    AdministradorAlterarUsuarioComponent,
    AlunoVisualizarComponent,
    AdministradorTabelaAulaComponent,
    AdministradorTabelaNoticiaComponent,
    ForumTopicoComponent,
    InserirForumTopicoComponent,
    VisualizarForumTopicoComponent,
    AtualizarForumTopicoComponent,
    AtualizarForumTopicoRespostaComponent,
    AtualizarForumTopicoReplicaComponent,
    PainelNoticiaComponent,
    AulaFiltroComponent,
  ],
  imports: [
    BrowserModule,
    CKEditorModule, 
    KatexModule,
    AppRoutingModule,
    AppRoutingModuleMecanica,
    PerfilRoutingModule,
    NoticiaRoutingModule,
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
    MatTooltipModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatRadioModule,
    MatTabsModule,
    MatDatepickerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatNativeDateModule,
    HttpClientModule,
    ManipularContaModule,
    AreaFisicaStoreModule,
    AreaFisicaDivisaoStoreModule,
    AreaInteresseStoreModule,
    AulaStoreModule,
    AulaComentarioStoreModule,
    AulaSessaoStoreModule,
    ForumStoreModule,
    ForumTagStoreModule,
    ForumTopicoStoreModule,
    ForumTopicoReplicaStoreModule,
    ForumTopicoRespostaStoreModule,
    HeaderStoreModule,
    NoticiaModule,
    TagStoreModule,
    UsuarioModule,
    UsuarioAulaSessaoFavoritadoModule,
    WidgetModule,
    PerfilProfessorRoutingModule,
    AdministradorRoutingModule,
    ForumTopicoRoutingModule,
    AlunoRoutingModule,
    AulaRoutingModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
