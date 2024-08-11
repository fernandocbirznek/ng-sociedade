import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialUIModule } from 'src/app/componentes/genericos/modules/material.modules';

import { 
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
} from '../features';

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
