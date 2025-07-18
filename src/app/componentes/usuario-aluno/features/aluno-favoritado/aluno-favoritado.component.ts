import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  atualizarManyAulaSessaoFavoritada,
  getManyUsuarioAulaSessaoFavoritado, 
} from '../../../../store';

import { AulaHelpers } from '../../../aula/helpers/aula-helpers';
import { CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-aluno-favoritado',
  templateUrl: './aluno-favoritado.component.html',
  styleUrls: ['./aluno-favoritado.component.css']
})
export class AlunoFavoritadoComponent implements OnInit {
  @Input() usuarioLogado: UsuarioModel = UsuarioModel.create({});

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
      this.usuarioAulaSessaoFavoritado = itens
        .map(item => ({
          ...item
        }));
      console.log("this.usuarioAulaSessaoFavoritado = ", this.usuarioAulaSessaoFavoritado);
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
          this.linkYoutubeMany.push(LinkYoutubeModel.create({}));
        }
        else if (item.aulaSessaoTipo != this.tipoSessaoAulaEnum.Imagem) {
          this.trustedDashboardHtml.push(this.sanitizer.bypassSecurityTrustHtml(item.conteudo));
          this.trustedUrlImageHtml.push('');
          this.linkYoutubeMany.push(LinkYoutubeModel.create({}));
          this.trustedPdfUrl.push('');
        }
        else if (item.aulaSessaoTipo == this.tipoSessaoAulaEnum.Imagem) {
          this.trustedDashboardHtml.push('');
          this.trustedUrlImageHtml.push(this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + item.conteudo));
          this.linkYoutubeMany.push(LinkYoutubeModel.create({}));
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
  



  //TODO, daqui pra baixo coisas do mural, melhorar ou separar em componente
  zoom = 1;
  
  onZoom(event: WheelEvent) {
    event.preventDefault();
    const delta = -event.deltaY * 0.001;
    this.zoom = Math.min(Math.max(this.zoom + delta, 0.3), 2); // limite de zoom
  }

  isButtonSalvarDisabled: boolean = true;
  onDragMoved(event: CdkDragEnd, usuarioAulaSessaoFavoritado: UsuarioAulaSessaoFavoritadoModel) {
     const position = event.source.getFreeDragPosition();

    this.usuarioAulaSessaoFavoritado = 
      [...this.usuarioAulaSessaoFavoritado].map(item => {
        if (item.id == usuarioAulaSessaoFavoritado.id)
          return UsuarioAulaSessaoFavoritadoModel.create({
            ...item,
            muralPosicaoX: position.x,
            muralPosicaoY: position.y
          });

        return UsuarioAulaSessaoFavoritadoModel.create(item);
      });

    this.isButtonSalvarDisabled = false;
  }

  salvarMural() {
    this.isButtonSalvarDisabled = true;
    this.store.dispatch(atualizarManyAulaSessaoFavoritada({
      atualizarAulaSessaoFavoritadaMany: this.usuarioAulaSessaoFavoritado
    }))
  }

  @ViewChild('muralWrapper', { static: true }) muralWrapper!: ElementRef;
  private isPanning = false;
  private startX = 0;
  private startY = 0;
  private scrollLeft = 0;
  private scrollTop = 0;

  onMouseDown(event: MouseEvent) {
    // Evita interferir em elementos clicáveis
    if ((event.target as HTMLElement).closest('.card-mural')) {
      return;
    }

    this.isPanning = true;
    this.startX = event.clientX;
    this.startY = event.clientY;
    const mural = this.muralWrapper.nativeElement;
    this.scrollLeft = mural.scrollLeft;
    this.scrollTop = mural.scrollTop;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isPanning) return;

    const x = event.clientX;
    const y = event.clientY;

    const dx = x - this.startX;
    const dy = y - this.startY;

    const mural = this.muralWrapper.nativeElement;
    mural.scrollLeft = this.scrollLeft - dx;
    mural.scrollTop = this.scrollTop - dy;
  }

  onMouseUp() {
    this.isPanning = false;
  }
}
