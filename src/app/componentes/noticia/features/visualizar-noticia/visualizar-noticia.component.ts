import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  ToastComponent 
} from 'src/app/componentes';

import { 
  NoticiaModel, 
  UsuarioModel,
  UsuarioNoticiaFavoritadoModel
} from 'src/app/models';

import { 
  getOneNoticiaById, 
  getOneUsuarioLogado, 
  getOneUsuarioNoticiaFavoritadoByNoticiaId, 
  inserirUsuarioNoticiaFavoritado, 
  removerUsuarioNoticiaFavoritado, 
  selecionarManyUsuarioNoticiaFavoritado 
} from 'src/app/store';

@Component({
  selector: 'app-visualizar-noticia',
  templateUrl: './visualizar-noticia.component.html',
  styleUrls: ['./visualizar-noticia.component.css']
})
export class VisualizarNoticiaComponent implements OnInit {

  noticiaSubscription$: Subscription = new Subscription();
  noticia$: Observable<NoticiaModel | undefined> = new Observable<NoticiaModel | undefined>();
  noticia: NoticiaModel | undefined = undefined ;

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel> = new Observable<UsuarioModel>();
  usuarioLogado: UsuarioModel | undefined = undefined ;

  usuarioNoticiaFavoritadoSubscription$: Subscription = new Subscription();
  usuarioNoticiaFavoritado$: Observable<UsuarioNoticiaFavoritadoModel | undefined> = new Observable<UsuarioNoticiaFavoritadoModel | undefined>();
  usuarioNoticiaFavoritado: UsuarioNoticiaFavoritadoModel | undefined = undefined;

  trustedDashboardHtml : SafeHtml | undefined = undefined;

  constructor(
    public dialogRef: MatDialogRef<VisualizarNoticiaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    public store: Store
  ) { }

  ngOnInit(): void {
    this.setupNoticia();
    this.setupUsuarioLogado();
    this.setupUsuarioNoticiaFavoritado();
  }

  ngOnDestroy() {
    this.noticiaSubscription$.unsubscribe();
    this.usuarioLogadoSubscription$.unsubscribe();
    this.usuarioNoticiaFavoritadoSubscription$.unsubscribe();
  }

  setupNoticia() {
    this.noticia$ = this.store.select(getOneNoticiaById(this.data));
    this.noticiaSubscription$ = this.noticia$.subscribe(item => {
      if(item) {
        this.noticia = item;
        this.trustedDashboardHtml = this.sanitizer.bypassSecurityTrustHtml(this.noticia.conteudo);
      }
    });
  }

  setupUsuarioLogado() {
    this.usuarioLogado$ = this.store.select(getOneUsuarioLogado);
    this.usuarioLogadoSubscription$ = this.usuarioLogado$.subscribe(item => {
      if(item) {
        this.usuarioLogado = item;
        //TODO, colocar num resolver?
        this.store.dispatch(selecionarManyUsuarioNoticiaFavoritado({ usuarioId: item.id }));
      }  
    });
  }

  setupUsuarioNoticiaFavoritado() {
    this.usuarioNoticiaFavoritado$ = this.store.select(getOneUsuarioNoticiaFavoritadoByNoticiaId(this.data));
    this.usuarioNoticiaFavoritadoSubscription$ = this.usuarioNoticiaFavoritado$.subscribe(item => {
        this.usuarioNoticiaFavoritado = item;
    });
  }
  
  fecharModal() {
    this.dialogRef.close();
  }

  curtirNoticia() {
    if (this.usuarioLogado && this.usuarioLogado.id > 0) {
      if (this.usuarioNoticiaFavoritado) 
        this.store.dispatch(removerUsuarioNoticiaFavoritado({ usuarioNoticiaFavoritado: this.usuarioNoticiaFavoritado }));
      else {
        let request: UsuarioNoticiaFavoritadoModel = new UsuarioNoticiaFavoritadoModel();
        request.usuarioId = this.usuarioLogado.id;
        request.noticiaId = this.data;
        this.store.dispatch(inserirUsuarioNoticiaFavoritado({ usuarioNoticiaFavoritado: request }));
      }
    }
    else 
      this.snackBar.openFromComponent(ToastComponent, {
        data: "Para curtir a notícia precisa criar uma conta e estar logado.",
        duration: 5 * 1000,
        panelClass: 'css-toast'
      });
  }
}
