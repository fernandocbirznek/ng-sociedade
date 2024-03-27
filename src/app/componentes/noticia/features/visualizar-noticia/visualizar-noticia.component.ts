import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  NoticiaModel 
} from 'src/app/models';
import { getOneNoticiaById } from 'src/app/store';

@Component({
  selector: 'app-visualizar-noticia',
  templateUrl: './visualizar-noticia.component.html',
  styleUrls: ['./visualizar-noticia.component.css']
})
export class VisualizarNoticiaComponent implements OnInit {

  trustedDashboardHtml : SafeHtml | undefined = undefined;

  constructor(
    public dialogRef: MatDialogRef<VisualizarNoticiaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NoticiaModel,
    private sanitizer: DomSanitizer,
    public store: Store
  ) { }

  ngOnInit(): void {
    this.trustedDashboardHtml = this.sanitizer.bypassSecurityTrustHtml(this.data.conteudo);
  }
  
  fecharModal() {
    this.dialogRef.close();
  }
}
