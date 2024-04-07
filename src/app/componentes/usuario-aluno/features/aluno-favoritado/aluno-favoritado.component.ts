import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UsuarioAulaSessaoFavoritadoModel, UsuarioModel } from 'src/app/models';
import { getManyUsuarioAulaSessaoFavoritado, selecionarManyUsuarioAulaSessaoFavoritadoByUsuarioId } from 'src/app/store';

@Component({
  selector: 'app-aluno-favoritado',
  templateUrl: './aluno-favoritado.component.html',
  styleUrls: ['./aluno-favoritado.component.css']
})
export class AlunoFavoritadoComponent implements OnInit {
  @Input() usuarioLogado: UsuarioModel = new UsuarioModel();

  usuarioAulaSessaoFavoritadoSubscription$: Subscription = new Subscription();
  usuarioAulaSessaoFavoritado$: Observable<UsuarioAulaSessaoFavoritadoModel[]> = new Observable<UsuarioAulaSessaoFavoritadoModel[]>();
  usuarioAulaSessaoFavoritado: UsuarioAulaSessaoFavoritadoModel[] = [];

  constructor(
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.setupUsuarioAulaSessaoFavoritado();
  }

  ngOnDestroy() {
    this.usuarioAulaSessaoFavoritadoSubscription$.unsubscribe();
  }

  setupUsuarioAulaSessaoFavoritado() {
    this.store.dispatch(selecionarManyUsuarioAulaSessaoFavoritadoByUsuarioId({ usuarioId: this.usuarioLogado.id }));
    this.usuarioAulaSessaoFavoritado$ = this.store.select(getManyUsuarioAulaSessaoFavoritado);
    this.usuarioAulaSessaoFavoritadoSubscription$ = this.usuarioAulaSessaoFavoritado$.subscribe(itens => {
      this.usuarioAulaSessaoFavoritado = itens;
    });
  }
  
}
