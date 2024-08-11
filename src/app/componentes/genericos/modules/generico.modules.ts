import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AulaFiltroComponent } from 'src/app/componentes/genericos/aula-filtro/aula-filtro.component';
import { AulaIconeComponent } from 'src/app/componentes/genericos/aula-icone/aula-icone.component';
import { CkeditorComponent } from 'src/app/componentes/genericos/ckeditor/ckeditor.component';
import { EditarUsuarioAreaInteresseComponent } from 'src/app/componentes/genericos/editar-usuario-area-interesse/editar-usuario-area-interesse.component';
import { ModalExcluirComponent } from 'src/app/componentes/genericos/modal-excluir/modal-excluir.component';
import { ToastComponent } from 'src/app/componentes/genericos/toast/toast.component';
import { UsuarioAreaInteresseComponent } from 'src/app/componentes/genericos/usuario-area-interesse/usuario-area-interesse.component';
import { UsuarioConquistasComponent } from 'src/app/componentes/genericos/usuario-conquistas/usuario-conquistas.component';
import { UsuarioInformacaoComponent } from 'src/app/componentes/genericos/usuario-informacao/usuario-informacao.component';
import { NoticiaFiltroComponent } from 'src/app/componentes/genericos/noticia-filtro/noticia-filtro.component';


import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialUIModule } from 'src/app/componentes/genericos/modules/material.modules';

@NgModule({
    declarations: [
        AulaFiltroComponent,
        AulaIconeComponent,
        CkeditorComponent,
        EditarUsuarioAreaInteresseComponent,
        ModalExcluirComponent,
        NoticiaFiltroComponent,
        ToastComponent,
        UsuarioAreaInteresseComponent,
        UsuarioConquistasComponent,
        UsuarioInformacaoComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        FlexLayoutModule,
        LayoutModule,
        MaterialUIModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        FlexLayoutModule,
        LayoutModule,
        MaterialUIModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,

        AulaFiltroComponent,
        AulaIconeComponent,
        CkeditorComponent,
        EditarUsuarioAreaInteresseComponent,
        ModalExcluirComponent,
        NoticiaFiltroComponent,
        ToastComponent,
        UsuarioAreaInteresseComponent,
        UsuarioConquistasComponent,
        UsuarioInformacaoComponent
    ]
})
export class GenericoModule { }
