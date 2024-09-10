import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { 
    AlunoAulaComponent, 
    AlunoFavoritadoComponent, 
    AlunoHomeComponent, 
    AlunoPerfilComponent, 
    AlunoVisualizarComponent 
} from '../features';

import { GenericoModule } from '../../genericos/modules/generico.modules';

@NgModule({
    declarations: [
        AlunoAulaComponent,
        AlunoFavoritadoComponent,
        AlunoHomeComponent,
        AlunoPerfilComponent,
        AlunoVisualizarComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        LayoutModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        GenericoModule
    ],
    exports: [
        AlunoAulaComponent,
        AlunoFavoritadoComponent,
        AlunoHomeComponent,
        AlunoPerfilComponent,
        AlunoVisualizarComponent
    ]
})
export class UsuarioAlunoModule { }