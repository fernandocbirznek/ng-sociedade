import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { 
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
    InformacaoGeralAulaComponent,
    InformacaoGeralForumComponent
} from '../features';

import { GenericoModule } from '../../genericos/modules/generico.modules';
import { TopicoModule } from '../../topicos';

@NgModule({
    declarations: [
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
        InformacaoGeralForumComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        FlexLayoutModule,
        LayoutModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        GenericoModule,
        TopicoModule,
    ],
    exports: [
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
        InformacaoGeralForumComponent
    ]
})
export class AdministradorModule { }