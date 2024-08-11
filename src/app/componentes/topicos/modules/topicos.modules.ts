import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { CriarContaComponent } from 'src/app/componentes/topicos/login-criar-conta/criar-conta/criar-conta.component';
import { CriarPerfilComponent } from 'src/app/componentes/topicos/login-criar-conta/criar-perfil/criar-perfil.component';
import { LoginCriarContaComponent } from 'src/app/componentes/topicos/login-criar-conta/login-criar-conta.component';

import { EquipeContatoComponent } from 'src/app/componentes/topicos/equipe-contato/equipe-contato.component';
import { MecanicaComponent } from 'src/app/componentes/topicos/mecanica/mecanica.component';
import { PerfilComponent } from 'src/app/componentes/topicos/perfil/perfil.component';

import { GenericoModule } from '../../genericos';

@NgModule({
    declarations: [
        EquipeContatoComponent,
        CriarContaComponent,
        CriarPerfilComponent,
        LoginCriarContaComponent,
        MecanicaComponent,
        PerfilComponent
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
        GenericoModule
    ],
    exports: [
        EquipeContatoComponent,
        CriarContaComponent,
        CriarPerfilComponent,
        LoginCriarContaComponent,
        MecanicaComponent,
        PerfilComponent
    ]
})
export class TopicoModule { }