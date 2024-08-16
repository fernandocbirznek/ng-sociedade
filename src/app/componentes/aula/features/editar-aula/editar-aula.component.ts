import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { 
  EditarAulaInformacaoComponent,
  EditarSessaoComponent,
  ModalExcluirComponent,
  NovaSessaoComponent,
} from 'src/app/componentes';

import {  
  AulaSessaoOrdemRequestModel,
  AulaSessaoModel, 
  UsuarioModel, 
  TipoSessaoAulaEnum,
  LinkYoutubeModel,
  AulaViewModel
} from 'src/app/models';

import { 
  atualizarAulaSessaoOrdem, 
  excluirAulaSessao, 
  getManyAulaSessaoByAulaId, 
  getOneAulaById, 
  getOneUsuarioLogado,
  removerRota, 
} from 'src/app/store';

import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { AulaHelpers } from '../../helpers';

@Component({
  selector: 'app-editar-aula',
  templateUrl: './editar-aula.component.html',
  styleUrls: ['./editar-aula.component.css']
})
export class EditarAulaComponent implements OnInit {

  aulaId: number = 0;

  aulaSubscription$: Subscription = new Subscription();
  aula$: Observable<AulaViewModel | undefined> = new Observable<AulaViewModel | undefined>();
  aula: AulaViewModel | undefined = undefined;

  aulaSessaoManySubscription$: Subscription = new Subscription();
  aulaSessaoMany$: Observable<AulaSessaoModel[]> = new Observable<AulaSessaoModel[]>();
  aulaSessaoMany: AulaSessaoModel[] = [];

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel | undefined> = new Observable<UsuarioModel | undefined>();
  usuarioLogado: UsuarioModel | undefined = undefined;

  trustedDashboardHtml : SafeHtml[] = [];
  trustedUrlImageHtml: SafeHtml[] = [];
  trustedPdfUrl: SafeResourceUrl[] = [];
  linkYoutubeMany: LinkYoutubeModel[] = [];

  readonly tipoSessaoAulaEnum = TipoSessaoAulaEnum;
  
  constructor(
    public dialog: MatDialog,
    public store: Store,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    public router: Router,
  ) {
    this.aulaId = this.route.snapshot.paramMap.get('id') ? +this.route.snapshot.paramMap.get('id')!: 0;
  }

  ngOnInit(): void {
    this.setupAula();
    this.setupAulaSessao();
    this.setupUsuarioLogado();

    this.scrollToTop();
  }

  ngOnDestroy() {
    this.aulaSubscription$.unsubscribe();
    this.aulaSessaoManySubscription$.unsubscribe();
    this.usuarioLogadoSubscription$.unsubscribe();
  }

  setupAula() {
    this.aula$ = this.store.select(getOneAulaById);
    this.aulaSubscription$ = this.aula$.subscribe(item => {
      if(item)
        this.aula = item;
    });
  }

  setupAulaSessao() {
    this.aulaSessaoMany$ = this.store.select(getManyAulaSessaoByAulaId(this.aulaId));
    this.aulaSessaoManySubscription$ = this.aulaSessaoMany$.subscribe(itens => {
      this.trustedDashboardHtml = [];
      this.trustedUrlImageHtml = [];
      this.linkYoutubeMany = [];
      this.trustedPdfUrl = [];
      this.aulaSessaoMany = itens;
      this.aulaSessaoMany.sort((a, b) => (a.ordem < b.ordem) ? -1 : 1);
      this.aulaSessaoMany.forEach(item => {
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
          this.linkYoutubeMany.push(new LinkYoutubeModel());
          this.trustedUrlImageHtml.push(this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + item.conteudo));
          this.trustedPdfUrl.push('');
        }
      });
    });
  }

  setupUsuarioLogado() {
    this.usuarioLogado$ = this.store.select(getOneUsuarioLogado);
    this.usuarioLogadoSubscription$ = this.usuarioLogado$.subscribe(item => {
      if(item)
        this.usuarioLogado = item;
    });
  }

  editarAulaInformacao() {
    this.dialog.open(EditarAulaInformacaoComponent, {
      minWidth: '500px',
      height: 'auto',
      data: {
        aula: this.aula
      }
    });
  }

  novaSessao() {
    this.dialog.open(NovaSessaoComponent, {
      minWidth: '80%',
      height: '90%',
      data: {
        aula: this.aula, 
        sessaoMany: this.aulaSessaoMany
      }
    });
  }

  ordenarSessao(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.aulaSessaoMany, event.previousIndex, event.currentIndex);
    this.reordenarSessoes();
  }

  public reordenarSessoes(): void {
    let ordem = 0;
    this.aulaSessaoMany = this.aulaSessaoMany.map((aulaSessao) => {
      let aulaSessaoAlterada = new AulaSessaoModel();
      aulaSessaoAlterada.aulaId = aulaSessao.aulaId;
      aulaSessaoAlterada.aulaSessaoTipo = aulaSessao.aulaSessaoTipo;
      aulaSessaoAlterada.conteudo = aulaSessao.conteudo;
      aulaSessaoAlterada.dataAtualizacao = aulaSessao.dataAtualizacao;
      aulaSessaoAlterada.dataCadastro = aulaSessao.dataCadastro;
      aulaSessaoAlterada.favoritado = aulaSessao.favoritado;
      aulaSessaoAlterada.id = aulaSessao.id;
      aulaSessaoAlterada.ordem = ordem++;
      aulaSessaoAlterada.titulo = aulaSessao.titulo;

      return aulaSessaoAlterada;
    });
    let request: AulaSessaoOrdemRequestModel = new AulaSessaoOrdemRequestModel();
    request.aulaSessaoMany = this.aulaSessaoMany;

    this.store.dispatch(atualizarAulaSessaoOrdem({ aulaSessaoOrdemRequest: request}));
  }

  editarSessao(sessao: AulaSessaoModel) {
    this.dialog.open(EditarSessaoComponent, {
      minWidth: '500px',
      height: 'auto',
      data: {
        aula: this.aula, 
        sessaoEditar: sessao
      }
    });
  }

  deletarSessao(sessao: AulaSessaoModel) {
    this.dialog.open(ModalExcluirComponent, {
      data: `Sessão: ${sessao.titulo}`
    }).afterClosed().subscribe((evento) => {
      if(evento)
        this.store.dispatch(excluirAulaSessao({ aulaSessaoId: sessao.id }));
    });
  }

  voltarPaginaPainelProfessor() {
    this.store.dispatch(removerRota({ 
      rota: {rotaNome: "", 
      rotaAcessar: ``,
      rotaNivel: 2} 
    }));
    this.router.navigate([`perfil-professor/${this.usuarioLogado?.email}/${this.usuarioLogado?.id}`]);
  }

  scrollToTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
}
