import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { 
  HeaderComponent, FooterComponent, MecanicaUmComponent, AppRoutingModuleMecanica, MecanicaDoisComponent, 
  MecanicaTresComponent, HomeComponent,
  MecanicaQuatroComponent, AulaTresExercicioComponent,
  PerfilProfessorRoutingModule,
  AulaRoutingModule,
  TopicoRoutingModule,
  AlunoRoutingModule,
  AdministradorRoutingModule,
  ForumTopicoRoutingModule,
  NoticiaRoutingModule,
  //AreaFisicaModule,
  //AreaInteresseModule,
  //AulaModule,
  //ForumModule,
  //ForumTagModule,
  //ForumTopicoModule,
  //NoticiaModule,
  //PerfilProfessorModule,
  //UsuarioAlunoModule,
  //SessaoModule,
  //TagModule,
  //TopicoModule,
  //AdministradorModule,
  MaterialUIModule,
  AtualizarAreaFisicaComponent,
  InserirAreaFisicaComponent,
  InserirAreaInteresseComponent,
  EditarAulaComponent,
  EditarAulaComentarioComponent,
  EditarAulaPosteriorAnteriorComponent,
  EditarAulaInformacaoComponent,
  NovaAulaComponent,
  VisualizarAulaComponent,
  AtualizarForumComponent,
  ForumComponent,
  InserirForumComponent,
  InserirForumTagComponent,
  AtualizarForumTopicoReplicaComponent,
  AtualizarForumTopicoComponent,
  AtualizarForumTopicoRespostaComponent,
  ForumTopicoComponent,
  InserirForumTopicoComponent,
  VisualizarForumTopicoComponent,
  VisualizarForumTopicoReplicaComponent,
  VisualizarForumTopicoRespostaComponent,
  AulaFiltroComponent,
  AulaIconeComponent,
  CkeditorComponent,
  EditarUsuarioAreaInteresseComponent,
  ModalExcluirComponent,
  NoticiaFiltroComponent,
  ToastComponent,
  UsuarioAreaInteresseComponent,
  UsuarioConquistasComponent,
  UsuarioInformacaoComponent,
  CardNoticiaComponent,
  EditarNoticiaComponent,
  NovaNoticiaComponent,
  PainelNoticiaComponent,
  VisualizarNoticiaComponent,
  ProfessorEditarPerfilComponent,
  ProfessorHomeComponent,
  ProfessorPerfilComponent,
  ProfessorPerfilVisualizarCardAulaComponent,
  ProfessorPerfilVisualizarCardNoticiaComponent,
  ProfessorPerfilVisualizarComponent,
  ProfessorTabelaAulaComponent,
  ProfessorTabelaNoticiaComponent,
  AdministradorAlterarUsuarioComponent,
  AdministradorAreaFisicaComponent,
  AdministradorHomeComponent,
  AdministradorInformacaoComponent,
  AdministradorModalCriarUsuarioComponent,
  AdministradorPerfilComponent,
  AdministradorTabelaAdministradorComponent,
  AdministradorTabelaAlunoComponent,
  AdministradorTabelaAreaInteresseComponent,
  AdministradorTabelaAulaComponent,
  AdministradorTabelaForumComponent,
  AdministradorTabelaForumTagComponent,
  AdministradorTabelaForumTopicoComponent,
  AdministradorTabelaNoticiaComponent,
  AdministradorTabelaProfessorComponent,
  AdministradorTabelaTagComponent,
  AlunoAulaComponent,
  AlunoFavoritadoComponent,
  AlunoHomeComponent,
  AlunoPerfilComponent,
  AlunoVisualizarComponent,
  CriarContaComponent,
  CriarPerfilComponent,
  EditarSessaoComponent,
  EquipeContatoComponent,
  InformacaoGeralAulaComponent,
  InformacaoGeralForumComponent,
  InserirTagComponent,
  LoginCriarContaComponent,
  MecanicaComponent,
  NovaSessaoComponent,
} from './componentes';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
//import { KatexModule } from 'ng-katex';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

//import { GenericoModule } from 'src/app/componentes/genericos/modules/generico.modules';

import {
  AreaFisicaStoreModule,
  AreaFisicaDivisaoStoreModule,
  AreaInteresseStoreModule,
  ArquivoPdfStoreModule,
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
  TagStoreModule,
  UsuarioModule,
  UsuarioAulaSessaoFavoritadoModule,
  WidgetModule,
  NoticiaStoreModule,
} from './store';

import { MatNativeDateModule } from '@angular/material/core';
import { FxFlexDirective } from './diretivas';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PerfilComponent } from './componentes/topicos/features';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MecanicaUmComponent,
    MecanicaDoisComponent,
    MecanicaTresComponent,
    MecanicaQuatroComponent,
    AulaTresExercicioComponent,

    AtualizarAreaFisicaComponent,
    InserirAreaFisicaComponent,
    InserirAreaInteresseComponent,
    EditarAulaComponent,
    EditarAulaComentarioComponent,
    EditarAulaInformacaoComponent,
    EditarAulaPosteriorAnteriorComponent,
    NovaAulaComponent,
    VisualizarAulaComponent,
    AtualizarForumComponent,
    ForumComponent,
    InserirForumComponent,
    InserirForumTagComponent,
    AtualizarForumTopicoComponent,
    AtualizarForumTopicoReplicaComponent,
    AtualizarForumTopicoRespostaComponent,
    ForumTopicoComponent,
    InserirForumTopicoComponent,
    VisualizarForumTopicoComponent,
    VisualizarForumTopicoReplicaComponent,
    VisualizarForumTopicoRespostaComponent,
    AulaFiltroComponent,
    AulaIconeComponent,
    CkeditorComponent,
    EditarUsuarioAreaInteresseComponent,
    ModalExcluirComponent,
    NoticiaFiltroComponent,
    ToastComponent,
    UsuarioAreaInteresseComponent,
    UsuarioConquistasComponent,
    UsuarioInformacaoComponent,
    CardNoticiaComponent,
    EditarNoticiaComponent,
    NovaNoticiaComponent,
    PainelNoticiaComponent,
    VisualizarNoticiaComponent,
    ProfessorEditarPerfilComponent,
    ProfessorHomeComponent,
    ProfessorPerfilComponent,
    ProfessorPerfilVisualizarComponent,
    ProfessorPerfilVisualizarCardAulaComponent,
    ProfessorPerfilVisualizarCardNoticiaComponent,
    ProfessorTabelaAulaComponent,
    ProfessorTabelaNoticiaComponent,
    EditarSessaoComponent,
    NovaSessaoComponent,
    InserirTagComponent,
    EquipeContatoComponent,
    CriarContaComponent,
    CriarPerfilComponent,
    LoginCriarContaComponent,
    MecanicaComponent,
    PerfilComponent,
    AdministradorAlterarUsuarioComponent,
    AdministradorAreaFisicaComponent,
    AdministradorHomeComponent,
    AdministradorInformacaoComponent,
    AdministradorPerfilComponent,
    AdministradorModalCriarUsuarioComponent,
    AdministradorTabelaAdministradorComponent,
    AdministradorTabelaAlunoComponent,
    AdministradorTabelaAreaInteresseComponent,
    AdministradorTabelaAulaComponent,
    AdministradorTabelaForumComponent,
    AdministradorTabelaForumTagComponent,
    AdministradorTabelaForumTopicoComponent,
    AdministradorTabelaNoticiaComponent,
    AdministradorTabelaProfessorComponent,
    AdministradorTabelaTagComponent,
    InformacaoGeralAulaComponent,
    InformacaoGeralForumComponent,
    AlunoAulaComponent,
    AlunoFavoritadoComponent,
    AlunoHomeComponent,
    AlunoPerfilComponent,
    AlunoVisualizarComponent
  ],
  imports: [
    AtualizarAreaFisicaComponent,
    InserirAreaFisicaComponent,
    InserirAreaInteresseComponent,
    EditarAulaComponent,
    EditarAulaComentarioComponent,
    EditarAulaInformacaoComponent,
    EditarAulaPosteriorAnteriorComponent,
    NovaAulaComponent,
    VisualizarAulaComponent,
    AtualizarForumComponent,
    ForumComponent,
    InserirForumComponent,
    InserirForumTagComponent,
    AtualizarForumTopicoComponent,
    AtualizarForumTopicoReplicaComponent,
    AtualizarForumTopicoRespostaComponent,
    ForumTopicoComponent,
    InserirForumTopicoComponent,
    VisualizarForumTopicoComponent,
    VisualizarForumTopicoReplicaComponent,
    VisualizarForumTopicoRespostaComponent,
    AulaFiltroComponent,
    AulaIconeComponent,
    CkeditorComponent,
    EditarUsuarioAreaInteresseComponent,
    ModalExcluirComponent,
    NoticiaFiltroComponent,
    ToastComponent,
    UsuarioAreaInteresseComponent,
    UsuarioConquistasComponent,
    UsuarioInformacaoComponent,
    CardNoticiaComponent,
    EditarNoticiaComponent,
    NovaNoticiaComponent,
    PainelNoticiaComponent,
    VisualizarNoticiaComponent,
    ProfessorEditarPerfilComponent,
    ProfessorHomeComponent,
    ProfessorPerfilComponent,
    ProfessorPerfilVisualizarComponent,
    ProfessorPerfilVisualizarCardAulaComponent,
    ProfessorPerfilVisualizarCardNoticiaComponent,
    ProfessorTabelaAulaComponent,
    ProfessorTabelaNoticiaComponent,
    EditarSessaoComponent,
    NovaSessaoComponent,
    InserirTagComponent,
    EquipeContatoComponent,
    CriarContaComponent,
    CriarPerfilComponent,
    LoginCriarContaComponent,
    MecanicaComponent,
    PerfilComponent,
    AdministradorAlterarUsuarioComponent,
    AdministradorAreaFisicaComponent,
    AdministradorHomeComponent,
    AdministradorInformacaoComponent,
    AdministradorPerfilComponent,
    AdministradorModalCriarUsuarioComponent,
    AdministradorTabelaAdministradorComponent,
    AdministradorTabelaAlunoComponent,
    AdministradorTabelaAreaInteresseComponent,
    AdministradorTabelaAulaComponent,
    AdministradorTabelaForumComponent,
    AdministradorTabelaForumTagComponent,
    AdministradorTabelaForumTopicoComponent,
    AdministradorTabelaNoticiaComponent,
    AdministradorTabelaProfessorComponent,
    AdministradorTabelaTagComponent,
    InformacaoGeralAulaComponent,
    InformacaoGeralForumComponent,
    AlunoAulaComponent,
    AlunoFavoritadoComponent,
    AlunoHomeComponent,
    AlunoPerfilComponent,
    AlunoVisualizarComponent,
    //FxFlexDirective,
    //AreaFisicaModule,
    //AreaInteresseModule,
    //AulaModule,
    //ForumModule,
    //ForumTagModule,
    //ForumTopicoModule,
    //GenericoModule,
    //NoticiaModule,
    //PerfilProfessorModule,
    //SessaoModule,
    //TagModule,
    //TopicoModule,
    //AdministradorModule,
    //UsuarioAlunoModule,
    //BrowserModule,
    CKEditorModule,
    //KatexModule,
    AppRoutingModule,
    AppRoutingModuleMecanica,
    NoticiaRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    MaterialUIModule,

    FormsModule, 
    ReactiveFormsModule,

    MatTableModule,
    MatPaginatorModule,
    MatNativeDateModule,
    HttpClientModule,
    ManipularContaModule,
    AreaFisicaStoreModule,
    AreaFisicaDivisaoStoreModule,
    AreaInteresseStoreModule,
    ArquivoPdfStoreModule,
    AulaStoreModule,
    AulaComentarioStoreModule,
    AulaSessaoStoreModule,
    ForumStoreModule,
    ForumTagStoreModule,
    ForumTopicoStoreModule,
    ForumTopicoReplicaStoreModule,
    ForumTopicoRespostaStoreModule,
    HeaderStoreModule,
    NoticiaStoreModule,
    TagStoreModule,
    UsuarioModule,
    UsuarioAulaSessaoFavoritadoModule,
    WidgetModule,
    PerfilProfessorRoutingModule,
    AdministradorRoutingModule,
    ForumTopicoRoutingModule,
    AlunoRoutingModule,
    AulaRoutingModule,
    TopicoRoutingModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
