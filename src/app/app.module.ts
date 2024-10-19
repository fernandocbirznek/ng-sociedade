import { DragDropModule } from "@angular/cdk/drag-drop";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DATE_LOCALE, MatNativeDateModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AppComponent } from "./app.component";
import { HeaderComponent, FooterComponent, HomeComponent, MecanicaUmComponent, MecanicaDoisComponent, MecanicaTresComponent, MecanicaQuatroComponent, AulaTresExercicioComponent, AtualizarAreaFisicaComponent, InserirAreaFisicaComponent, InserirAreaInteresseComponent, EditarAulaComponent, EditarAulaComentarioComponent, EditarAulaInformacaoComponent, EditarAulaPosteriorAnteriorComponent, NovaAulaComponent, VisualizarAulaComponent, AtualizarForumComponent, ForumComponent, InserirForumComponent, InserirForumTagComponent, AtualizarForumTopicoComponent, AtualizarForumTopicoReplicaComponent, AtualizarForumTopicoRespostaComponent, ForumTopicoComponent, InserirForumTopicoComponent, VisualizarForumTopicoComponent, VisualizarForumTopicoReplicaComponent, VisualizarForumTopicoRespostaComponent, AulaFiltroComponent, AulaIconeComponent, CkeditorComponent, EditarUsuarioAreaInteresseComponent, ModalExcluirComponent, NoticiaFiltroComponent, ToastComponent, UsuarioAreaInteresseComponent, UsuarioConquistasComponent, UsuarioInformacaoComponent, CardNoticiaComponent, EditarNoticiaComponent, NovaNoticiaComponent, PainelNoticiaComponent, VisualizarNoticiaComponent, ProfessorEditarPerfilComponent, ProfessorHomeComponent, ProfessorPerfilComponent, ProfessorPerfilVisualizarComponent, ProfessorPerfilVisualizarCardAulaComponent, ProfessorPerfilVisualizarCardNoticiaComponent, ProfessorTabelaAulaComponent, ProfessorTabelaNoticiaComponent, EditarSessaoComponent, NovaSessaoComponent, InserirTagComponent, EquipeContatoComponent, CriarContaComponent, CriarPerfilComponent, LoginCriarContaComponent, MecanicaComponent, AdministradorAlterarUsuarioComponent, AdministradorAreaFisicaComponent, AdministradorHomeComponent, AdministradorInformacaoComponent, AdministradorPerfilComponent, AdministradorModalCriarUsuarioComponent, AdministradorTabelaAdministradorComponent, AdministradorTabelaAlunoComponent, AdministradorTabelaAreaInteresseComponent, AdministradorTabelaAulaComponent, AdministradorTabelaForumComponent, AdministradorTabelaForumTagComponent, AdministradorTabelaForumTopicoComponent, AdministradorTabelaNoticiaComponent, AdministradorTabelaProfessorComponent, AdministradorTabelaTagComponent, InformacaoGeralAulaComponent, InformacaoGeralForumComponent, AlunoAulaComponent, AlunoFavoritadoComponent, AlunoHomeComponent, AlunoPerfilComponent, AlunoVisualizarComponent, AppRoutingModuleMecanica, NoticiaRoutingModule, PerfilProfessorRoutingModule, AdministradorRoutingModule, ForumTopicoRoutingModule, AlunoRoutingModule, AulaRoutingModule, 
  TopicoRoutingModule, KatexComponent } from "./componentes";
import { PerfilComponent } from "./componentes/topicos/features";
import { ManipularContaModule, AreaFisicaStoreModule, AreaFisicaDivisaoStoreModule, AreaInteresseStoreModule, ArquivoPdfStoreModule, AulaStoreModule, AulaComentarioStoreModule, AulaSessaoStoreModule, ForumStoreModule, ForumTagStoreModule, ForumTopicoStoreModule, ForumTopicoReplicaStoreModule, ForumTopicoRespostaStoreModule, HeaderStoreModule, NoticiaStoreModule, TagStoreModule, UsuarioModule, UsuarioAulaSessaoFavoritadoModule, WidgetModule, ManipularContaEffects } from "./store";
import { CommonModule } from "@angular/common";
import { MatIconModule } from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app.routes";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';

import * as fromManipularConta from './store/manipular-conta';

@NgModule({ declarations: [
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
        AlunoVisualizarComponent,
        KatexComponent
    ],
    bootstrap: [AppComponent], 
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
      CommonModule,
      BrowserAnimationsModule,
      MatIconModule,
      OverlayModule,
      MatRadioModule,
      MatTabsModule,
      MatDatepickerModule,
      MatCheckboxModule,
      BrowserModule,
      CKEditorModule,
      AppRoutingModule,
      AppRoutingModuleMecanica,
      NoticiaRoutingModule,
      DragDropModule,
      FormsModule,
      ReactiveFormsModule,
      MatTableModule,
      MatPaginatorModule,
      MatNativeDateModule,
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
      MatButtonModule,
      MatDialogModule,
      MatFormFieldModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatSelectModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatTableModule,
      MatTooltipModule,
      MatInputModule,
      DragDropModule,
      TopicoRoutingModule,
      StoreModule.forRoot([]),
      EffectsModule.forFeature([]),
      EffectsModule.forRoot([]),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production, connectInZone: true })
    ], 
    providers: [
      provideHttpClient(withInterceptorsFromDi()),
      { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
    ] 
  })
export class AppModule { }
