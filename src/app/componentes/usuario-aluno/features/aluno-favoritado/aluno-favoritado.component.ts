import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  LinkYoutubeModel,
  TipoSessaoAulaEnum, 
  UsuarioAulaSessaoFavoritadoModel, 
  UsuarioModel 
} from '../../../../models';

import { 
  adicionarRota,
  alterarTipoSessaoAulaEnum,
  getManyUsuarioAulaSessaoFavoritado, 
} from '../../../../store';

import { AulaHelpers } from '../../../aula/helpers/aula-helpers';

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
  linkYoutubeMany: LinkYoutubeModel[] = [];
  trustedPdfUrl: SafeResourceUrl[] = [];

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
    this.usuarioAulaSessaoFavoritado$ = this.store.select(getManyUsuarioAulaSessaoFavoritado);
    this.usuarioAulaSessaoFavoritadoSubscription$ = this.usuarioAulaSessaoFavoritado$.subscribe(itens => {
      this.trustedDashboardHtml = [];
      this.trustedUrlImageHtml = [];
      this.cardExpandidoMany = [];
      this.linkYoutubeMany = [];
      this.trustedPdfUrl = [];
      this.usuarioAulaSessaoFavoritado = itens;
      this.usuarioAulaSessaoFavoritado.forEach(item => {
        this.cardExpandidoMany.push(false);
        if (item.aulaSessaoTipo == this.tipoSessaoAulaEnum.Video) {
          this.linkYoutubeMany.push(AulaHelpers.getLinkYoutube(item.conteudo, this.sanitizer));
          this.trustedUrlImageHtml.push('');
          this.trustedDashboardHtml.push('');
          this.trustedPdfUrl.push('');
        }
        else if (item.aulaSessaoTipo == this.tipoSessaoAulaEnum.Pdf && item.arquivoPdf && item.arquivoPdf.conteudo) {
          let conteudo = URL.createObjectURL(item.arquivoPdf.conteudo);

          this.trustedPdfUrl.push(this.sanitizer.bypassSecurityTrustResourceUrl(conteudo));
          this.trustedUrlImageHtml.push('');
          this.trustedDashboardHtml.push('');
          this.linkYoutubeMany.push(new LinkYoutubeModel());
        }
        else if (item.aulaSessaoTipo != this.tipoSessaoAulaEnum.Imagem) {
          this.trustedDashboardHtml.push(this.sanitizer.bypassSecurityTrustHtml(item.conteudo));
          this.trustedUrlImageHtml.push('');
          this.linkYoutubeMany.push(new LinkYoutubeModel());
          this.trustedPdfUrl.push('');
        }
        else if (item.aulaSessaoTipo == this.tipoSessaoAulaEnum.Imagem) {
          this.trustedDashboardHtml.push('');
          this.trustedUrlImageHtml.push(this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + item.conteudo));
          this.linkYoutubeMany.push(new LinkYoutubeModel());
          this.trustedPdfUrl.push('');
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
    this.store.dispatch(adicionarRota({ 
      rota: {
        rotaNome: `${item.titulo}`, 
        rotaAcessar: `visualizar-aula/${item.id}`,
        rotaNivel: 2
      } 
    }));
  }

  expandirCard(item: number) {
    this.cardExpandidoMany[item] = !this.cardExpandidoMany[item];
  }
  
}
