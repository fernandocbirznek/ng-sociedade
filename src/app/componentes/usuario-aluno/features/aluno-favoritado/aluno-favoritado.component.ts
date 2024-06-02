import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  TipoSessaoAulaEnum, 
  UsuarioAulaSessaoFavoritadoModel, 
  UsuarioModel 
} from 'src/app/models';

import { 
  alterarTipoSessaoAulaEnum,
  getManyUsuarioAulaSessaoFavoritado, 
  selecionarManyUsuarioAulaSessaoFavoritadoByUsuarioId 
} from 'src/app/store';

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

  trustedDashboardHtml : SafeHtml[] = [];
  trustedUrlImageHtml: SafeHtml[] = [];

  cardExpandidoMany: boolean[] = [];

  filtroSessaoAulaEnum: TipoSessaoAulaEnum = TipoSessaoAulaEnum.None;

  readonly tipoFiltroFavoritadoEnum = TipoSessaoAulaEnum;
  readonly tipoSessaoAulaEnum = TipoSessaoAulaEnum;

  constructor(
    public store: Store,
    private sanitizer: DomSanitizer,
    public router: Router
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
      this.trustedDashboardHtml = [];
      this.trustedUrlImageHtml = [];
      this.cardExpandidoMany = [];
      this.usuarioAulaSessaoFavoritado = itens;
      this.usuarioAulaSessaoFavoritado.forEach(item => {
        this.cardExpandidoMany.push(false);
        if (item.aulaSessaoTipo != this.tipoSessaoAulaEnum.Imagem) {
          this.trustedDashboardHtml.push(this.sanitizer.bypassSecurityTrustHtml(item.conteudo));
          this.trustedUrlImageHtml.push('');
        }
        if (item.aulaSessaoTipo == this.tipoSessaoAulaEnum.Imagem) {
          this.trustedDashboardHtml.push('');
          this.trustedUrlImageHtml.push(this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + item.conteudo));
        }
      });
    });
  }

  selecionouFiltro(item: TipoSessaoAulaEnum) {
    if (this.filtroSessaoAulaEnum == item)
      this.filtroSessaoAulaEnum = TipoSessaoAulaEnum.None;
    else
      this.filtroSessaoAulaEnum = item;

    this.store.dispatch(alterarTipoSessaoAulaEnum({ tipoSessaoAulaEnum: this.filtroSessaoAulaEnum }));
  }

  acessarAula(item: UsuarioAulaSessaoFavoritadoModel) {
    this.router.navigate([`visualizar-aula/${item.aulaId}`]);
  }

  expandirCard(item: number) {
    this.cardExpandidoMany[item] = !this.cardExpandidoMany[item];
  }
  
}
