import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { 
    ProfessorEditarPerfilComponent, 
    ProfessorHomeComponent,
    ProfessorPerfilComponent,
    ProfessorPerfilVisualizarCardAulaComponent,
    ProfessorPerfilVisualizarCardNoticiaComponent,
    ProfessorPerfilVisualizarComponent,
    ProfessorTabelaAulaComponent,
    ProfessorTabelaNoticiaComponent
} from '../features';

import { GenericoModule } from '../../genericos/modules/generico.modules';

import { UsuarioAlunoModule } from '../../usuario-aluno';

@NgModule({
    declarations: [
        ProfessorEditarPerfilComponent,
        ProfessorHomeComponent,
        ProfessorPerfilComponent,
        ProfessorPerfilVisualizarComponent,
        ProfessorPerfilVisualizarCardAulaComponent,
        ProfessorPerfilVisualizarCardNoticiaComponent,
        ProfessorTabelaAulaComponent,
        ProfessorTabelaNoticiaComponent
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
        UsuarioAlunoModule,
    ],
    exports: [
        ProfessorEditarPerfilComponent,
        ProfessorHomeComponent,
        ProfessorPerfilComponent,
        ProfessorPerfilVisualizarComponent,
        ProfessorPerfilVisualizarCardAulaComponent,
        ProfessorPerfilVisualizarCardNoticiaComponent,
        ProfessorTabelaAulaComponent,
        ProfessorTabelaNoticiaComponent
    ]
})
export class PerfilProfessorModule { }