import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { 
    EditarSessaoComponent,
    NovaSessaoComponent
} from '../features';

import { GenericoModule } from '../../genericos/modules/generico.modules';

@NgModule({
    declarations: [
        EditarSessaoComponent,
        NovaSessaoComponent
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
        EditarSessaoComponent,
        NovaSessaoComponent
    ]
})
export class SessaoModule { }