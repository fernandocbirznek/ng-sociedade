import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { 
    AtualizarForumTopicoComponent, 
    AtualizarForumTopicoReplicaComponent, 
    AtualizarForumTopicoRespostaComponent,
    ForumTopicoComponent,
    InserirForumTopicoComponent,
    VisualizarForumTopicoComponent,
    VisualizarForumTopicoReplicaComponent,
    VisualizarForumTopicoRespostaComponent
} from '../features';

import { GenericoModule } from '../../genericos/modules/generico.modules';

@NgModule({
    declarations: [
        AtualizarForumTopicoComponent,
        AtualizarForumTopicoReplicaComponent,
        AtualizarForumTopicoRespostaComponent,
        ForumTopicoComponent,
        InserirForumTopicoComponent,
        VisualizarForumTopicoComponent,
        VisualizarForumTopicoReplicaComponent,
        VisualizarForumTopicoRespostaComponent
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
        AtualizarForumTopicoComponent,
        AtualizarForumTopicoReplicaComponent,
        AtualizarForumTopicoRespostaComponent,
        ForumTopicoComponent,
        InserirForumTopicoComponent,
        VisualizarForumTopicoComponent,
        VisualizarForumTopicoReplicaComponent,
        VisualizarForumTopicoRespostaComponent
    ]
})
export class ForumTopicoModule { }