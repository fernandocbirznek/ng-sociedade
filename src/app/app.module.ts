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
  AreaFisicaModule,
  AreaInteresseModule,
  AulaModule,
  ForumModule,
  ForumTagModule,
  ForumTopicoModule,
  NoticiaModule,
  PerfilProfessorModule,
  UsuarioAlunoModule,
  SessaoModule,
  TagModule,
  TopicoModule,
  AdministradorModule,
} from './componentes';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { KatexModule } from 'ng-katex';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { GenericoModule } from 'src/app/componentes/genericos/modules/generico.modules';

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

    
  ],
  imports: [
    FxFlexDirective,
    AreaFisicaModule,
    AreaInteresseModule,
    AulaModule,
    ForumModule,
    ForumTagModule,
    ForumTopicoModule,
    GenericoModule,
    NoticiaModule,
    PerfilProfessorModule,
    SessaoModule,
    TagModule,
    TopicoModule,
    AdministradorModule,
    UsuarioAlunoModule,
    BrowserModule,
    CKEditorModule,
    KatexModule,
    AppRoutingModule,
    AppRoutingModuleMecanica,
    NoticiaRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,

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
