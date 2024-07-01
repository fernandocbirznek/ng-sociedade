import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { 
  EditarAulaComentarioComponent,
  ModalExcluirComponent,
  ProfessorPerfilVisualizarComponent 
} from 'src/app/componentes';

import { 
  AreaFisicaModel,
  AulaComentarioModel,
  AulaModel,
  AulaSessaoModel,
  LinkYoutubeModel,
  TipoSessaoAulaEnum,
  UsuarioAulaCurtidoModel,
  UsuarioAulaFavoritadaModel,
  UsuarioAulaSessaoFavoritadoModel,
  UsuarioModel,
  WidgetModel,
  WidgetViewModel
} from 'src/app/models';

import { 
  alterarTituloPagina,
  atualizarAulaSelected,
  excluirAulaComentario, 
  getIsUsuarioAulaCurtida, 
  getIsUsuarioAulaFavoritada, 
  getIsUsuarioLogadoAulaComentario, 
  getManyAulaComentarioByAulaSelected, 
  getManySessaoIdInUsuarioAulaSessaoFavoritado, 
  getOneAreaFisicaByAreaFisicaId, 
  getOneAulaById, 
  getOneUsuarioLogado, 
  getWidgetMany, 
  inserirAulaComentario, 
  inserirUsuarioAulaCurtido, 
  inserirUsuarioAulaFavoritada, 
  inserirUsuarioAulaSessaoFavoritado, 
  inserirWidgetConcluido, 
  inserirWidgetCursando, 
  inserirWidgetCursar, 
  removerUsuarioAulaCurtido, 
  removerUsuarioAulaFavoritada, 
  removerUsuarioAulaSessaoFavoritado, 
  removerWidgetConcluido, 
  removerWidgetCursando, 
  removerWidgetCursar, 
} from 'src/app/store';

import Editor from 'src/app/componentes/genericos/ckeditor/build/ckeditor';

import { AulaHelpers } from '../../helpers/aula-helpers';

@Component({
  selector: 'app-visualizar-aula',
  templateUrl: './visualizar-aula.component.html',
  styleUrls: ['./visualizar-aula.component.css']
})
export class VisualizarAulaComponent implements OnInit { 
  aulaSubscription$: Subscription = new Subscription();
  aula$: Observable<AulaModel | undefined> = new Observable<AulaModel | undefined>();
  aula: AulaModel = new AulaModel();
  aulaId: number = 0;

  aulaComentarioManySubscription$: Subscription = new Subscription();
  aulaComentarioMany$: Observable<AulaComentarioModel[]> = new Observable<AulaComentarioModel[]>();
  aulaComentarioMany: AulaComentarioModel[] = [];

  isUsuarioAulaComentadoSubscription$: Subscription = new Subscription();
  isUsuarioAulaComentado$: Observable<boolean> = new Observable<boolean>();
  isUsuarioAulaComentado: boolean = false;

  usuarioAulaCurtidoSubscription$: Subscription = new Subscription();
  usuarioAulaCurtido$: Observable<UsuarioAulaCurtidoModel | undefined> = new Observable<UsuarioAulaCurtidoModel | undefined>();
  usuarioAulaCurtido: UsuarioAulaCurtidoModel | undefined = undefined;

  usuarioAulaFavoritadaSubscription$: Subscription = new Subscription();
  usuarioAulaFavoritada$: Observable<UsuarioAulaFavoritadaModel | undefined> = new Observable<UsuarioAulaFavoritadaModel | undefined>();
  usuarioAulaFavoritada: UsuarioAulaFavoritadaModel | undefined = undefined;

  usuarioAulaSessaoFavoritadoSubscription$: Subscription = new Subscription();
  usuarioAulaSessaoFavoritado$: Observable<number[]> = new Observable<number[]>();
  usuarioAulaSessaoFavoritado: number[] = [];

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel | undefined> = new Observable<UsuarioModel | undefined>();
  usuarioLogado: UsuarioModel | undefined = undefined;

  widgetSubscription$: Subscription = new Subscription();
  widget$: Observable<WidgetViewModel> = new Observable<WidgetViewModel>();
  widget: WidgetViewModel | undefined = undefined;

  widgetCursar: boolean = false;
  widgetCursando: boolean = false;
  widgetConcluido: boolean = false;

  aulaSessaoMany: AulaSessaoModel[] = [];

  trustedVisualizarAulaHtml : SafeHtml[] = [];
  trustedAulaComentarioHtml : SafeHtml[] = [];
  trustedUrlImageHtml: SafeHtml[] = [];
  trustedPdfUrl: SafeResourceUrl[] = [];
  linkYoutubeMany: LinkYoutubeModel[] = [];

  escreverComentario: boolean = false;
  formComentario: FormGroup = null as any;
  formControlComentario = new FormControl('', [Validators.required, Validators.maxLength(2000)]);
  public ckEditor = Editor;

  readonly tipoSessaoAulaEnum = TipoSessaoAulaEnum;

  constructor(
    public store: Store,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    public router: Router,
    private dialog: MatDialog,
  ) { 
    this.aulaId = this.route.snapshot.paramMap.get('id') ? +this.route.snapshot.paramMap.get('id')!: 0;
    this.criarFormularioComentario();
  }

  ngOnInit(): void {
    this.setupAulaComentario();
    this.setupAula();
    this.setupUsuarioAulaComentado();
    this.setupUsuarioAulaSessaoFavoritado();
    this.setupUsuarioAulaCurtido();
    this.setupUsuarioAulaFavoritada();
    this.setupUsuarioLogado();
    this.setupWidget();

    this.scrollToTop();
  }

  ngOnDestroy() {
    this.aulaSubscription$.unsubscribe();
    this.aulaComentarioManySubscription$.unsubscribe();
    this.usuarioAulaSessaoFavoritadoSubscription$.unsubscribe();
    this.usuarioAulaCurtidoSubscription$.unsubscribe();
    this.usuarioAulaFavoritadaSubscription$.unsubscribe();
    this.usuarioLogadoSubscription$.unsubscribe();
    this.widgetSubscription$.unsubscribe();    
  }

  private criarFormularioComentario() {
    this.formComentario = new FormGroup({
      comentario: this.formControlComentario,
    })
  }

  setupAula() {
    this.aula$ = this.store.select(getOneAulaById);
    this.aulaSubscription$ = this.aula$.subscribe(item => {
      if(item)
        this.setupAulaSessao(item);
    });
  }

  setupAulaComentario() {
    this.aulaComentarioMany$ = this.store.select(getManyAulaComentarioByAulaSelected);
    this.aulaComentarioManySubscription$ = this.aulaComentarioMany$.subscribe(itens => {
      this.aulaComentarioMany = itens;
      this.setupAulaComentarioTrustedHtml();
    });
  }

  setupAulaComentarioTrustedHtml() {
    this.trustedAulaComentarioHtml = [];
    this.aulaComentarioMany.forEach(item => {
      this.trustedAulaComentarioHtml.push(this.sanitizer.bypassSecurityTrustHtml(item.descricao));
    })
  }

  setupUsuarioAulaComentado() {
    this.isUsuarioAulaComentado$ = this.store.select(getIsUsuarioLogadoAulaComentario);
    this.isUsuarioAulaComentadoSubscription$ = this.isUsuarioAulaComentado$.subscribe(item => {
      this.isUsuarioAulaComentado = item;
    });
  }

  setupUsuarioAulaSessaoFavoritado() {
    this.usuarioAulaSessaoFavoritado$ = this.store.select(getManySessaoIdInUsuarioAulaSessaoFavoritado);
    this.usuarioAulaSessaoFavoritadoSubscription$ = this.usuarioAulaSessaoFavoritado$.subscribe(itens => {
      this.usuarioAulaSessaoFavoritado = itens;
    });
  }

  setupUsuarioAulaCurtido() {
    this.usuarioAulaCurtido$ = this.store.select(getIsUsuarioAulaCurtida(this.aulaId));
    this.usuarioAulaCurtidoSubscription$ = this.usuarioAulaCurtido$.subscribe(item => {
      this.usuarioAulaCurtido = item;
    });
  }

  setupUsuarioAulaFavoritada() {
    this.usuarioAulaFavoritada$ = this.store.select(getIsUsuarioAulaFavoritada(this.aulaId));
    this.usuarioAulaFavoritadaSubscription$ = this.usuarioAulaFavoritada$.subscribe(item => {
      this.usuarioAulaFavoritada = item;
    });
  }

  setupUsuarioLogado() {
    this.usuarioLogado$ = this.store.select(getOneUsuarioLogado);
    this.usuarioLogadoSubscription$ = this.usuarioLogado$.subscribe(item => {
      if(item) {
        this.usuarioLogado = item;
      }  
    });
  }

  setupWidget() {
    this.widget$ = this.store.select(getWidgetMany);
    this.widgetSubscription$ = this.widget$.subscribe(item => {
      if (item) {
        this.widget = item;
        this.findSelecionado();
      }
    });
  }

  curtirAula() {
    if (this.usuarioLogado) {
      let request: UsuarioAulaCurtidoModel = new UsuarioAulaCurtidoModel();
      request.aulaId = this.aula.id;
      request.usuarioId = this.usuarioLogado?.id;

      this.store.dispatch(inserirUsuarioAulaCurtido({ usuarioAulaCurtido: request }));
    }
  }

  removerCurtirAula() {
    if (this.usuarioLogado && this.usuarioAulaCurtido) {
      let request: UsuarioAulaCurtidoModel = new UsuarioAulaCurtidoModel();
      request.id = this.usuarioAulaCurtido.id;
      request.aulaId = this.aula.id;
      request.usuarioId = this.usuarioLogado?.id;

      this.store.dispatch(removerUsuarioAulaCurtido({ usuarioAulaCurtido: request }));
    }
  }

  favoritarAula() {
    if (this.usuarioLogado) {
      let request: UsuarioAulaFavoritadaModel = new UsuarioAulaFavoritadaModel();
      request.aulaId = this.aula.id;
      request.usuarioId = this.usuarioLogado?.id;

      this.store.dispatch(inserirUsuarioAulaFavoritada({ usuarioAulaFavoritada: request }));
    }
  }

  removerAulaFavoritada() {
    if (this.usuarioLogado && this.usuarioAulaFavoritada) {
      let request: UsuarioAulaFavoritadaModel = new UsuarioAulaFavoritadaModel();
      request.id = this.usuarioAulaFavoritada.id;
      request.aulaId = this.aula.id;
      request.usuarioId = this.usuarioLogado?.id;

      this.store.dispatch(removerUsuarioAulaFavoritada({ usuarioAulaFavoritada: request }));
    }
  }

  visualizarPerfil() {
    this.dialog.open(ProfessorPerfilVisualizarComponent, {
      data: this.aula.professorId,
      width: '80%',
      height: 'auto',
      autoFocus: false
    }).afterClosed().subscribe((aula: AulaModel) => {
      if(aula) {
        this.router.navigate([`visualizar-aula/${aula.id}`]);
        this.setupAulaSessao(aula);
      }
    });
  }

  salvarSessaoFavoritado(item: AulaSessaoModel) {
    if (this.usuarioLogado && this.usuarioLogado.id > 0) {
      let request: UsuarioAulaSessaoFavoritadoModel = new UsuarioAulaSessaoFavoritadoModel();
      request.aulaSessaoId = item.id;
      request.usuarioId = this.usuarioLogado.id;

      this.store.dispatch(inserirUsuarioAulaSessaoFavoritado({ usuarioAulaSessaoFavoritado: request }));
    }
  }

  removerSessaoFavoritado(item: AulaSessaoModel) {
    if (this.usuarioLogado && this.usuarioLogado.id > 0)
      this.store.dispatch(removerUsuarioAulaSessaoFavoritado({ usuarioId: this.usuarioLogado.id, aulaSessaoId: item.id }));
  }

  voltarPaginaMecanica() {
    //TODO, precisa retornar para pagina certa
    this.store.dispatch(alterarTituloPagina({ titulo: 'mecanica', areaFisicaId: this.aula.areaFisicaId }));
    //TODO, precisa fazer uma store de rotas, salvar a rota anterior
    this.router.navigate([`mecanica/${this.aula.areaFisicaId}`]);
  }

  setupAulaSessao(item: AulaModel) {
    this.aula = item;
    this.trustedVisualizarAulaHtml = [];
    this.trustedUrlImageHtml = [];
    this.linkYoutubeMany = [];
    this.trustedPdfUrl = [];

    if (item.aulaSessaoMany.length > 0) {
      this.aulaSessaoMany = [...item.aulaSessaoMany];
      this.aulaSessaoMany.forEach(item => {
        if (item.aulaSessaoTipo == this.tipoSessaoAulaEnum.Video) {
          this.linkYoutubeMany.push(AulaHelpers.getLinkYoutube(item.conteudo, this.sanitizer));
          this.trustedUrlImageHtml.push('');
          this.trustedVisualizarAulaHtml.push('');
          this.trustedPdfUrl.push('');
        }
        else if (item.aulaSessaoTipo == this.tipoSessaoAulaEnum.Pdf && item.arquivoPdf && item.arquivoPdf.conteudo) {
          let conteudo = URL.createObjectURL(item.arquivoPdf.conteudo);

          this.trustedPdfUrl.push(this.sanitizer.bypassSecurityTrustResourceUrl(conteudo));
          this.trustedUrlImageHtml.push('');
          this.trustedVisualizarAulaHtml.push('');
          this.linkYoutubeMany.push(new LinkYoutubeModel());
        }
        else if (item.aulaSessaoTipo != this.tipoSessaoAulaEnum.Imagem) {
          this.trustedVisualizarAulaHtml.push(this.sanitizer.bypassSecurityTrustHtml(item.conteudo));
          this.trustedUrlImageHtml.push('');
          this.trustedPdfUrl.push('');
          this.linkYoutubeMany.push(new LinkYoutubeModel());
        }
        else if (item.aulaSessaoTipo == this.tipoSessaoAulaEnum.Imagem) {
          this.trustedVisualizarAulaHtml.push('');
          this.trustedPdfUrl.push('');
          this.trustedUrlImageHtml.push(this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + item.conteudo));
          this.linkYoutubeMany.push(new LinkYoutubeModel());
        }
      });
    }
  }

  comentar() {
    this.escreverComentario = true;
  }

  cancelarComentario() {
    this.escreverComentario = false;
  }

  cadastrarComentario() {
    let aulaComentario: AulaComentarioModel = new AulaComentarioModel();
    if (this.usuarioLogado) {
      aulaComentario.aulaId = this.aula.id;
      aulaComentario.usuarioId = this.usuarioLogado.id;
      aulaComentario.descricao = this.formComentario.get("comentario")?.value;

      this.store.dispatch(inserirAulaComentario({ aulaComentario: aulaComentario }));
    }
    this.escreverComentario = false;
  }

  editarComentario(item: AulaComentarioModel) {
    if (this.usuarioLogado)
      this.dialog.open(EditarAulaComentarioComponent, {
        data: {
          aulaComentario: item,
          usuarioLogado: this.usuarioLogado
        }
      });
  }

  excluirComentario(item: AulaComentarioModel) {
    this.dialog.open(ModalExcluirComponent, {
      data: `Comentário`
    }).afterClosed().subscribe((evento) => {
      if(evento) {
        this.store.dispatch(excluirAulaComentario({ aulaComentarioId: item.id }));
      }
    });
  }

  cursar() {
    let widgetCursar = this.getWidget();
    if (widgetCursar) {
      this.store.dispatch(inserirWidgetCursar({ widgetCursar: widgetCursar }));
      this.store.dispatch(removerWidgetConcluido({ widgetConcluidoId: widgetCursar.aulaId }));
      this.store.dispatch(removerWidgetCursando({ widgetCursandoId: widgetCursar.aulaId }));
    }
  }

  cursando() {
    let widgetCursando = this.getWidget();
    if (widgetCursando) {
      this.store.dispatch(inserirWidgetCursando({ widgetCursando: widgetCursando }));
      this.store.dispatch(removerWidgetConcluido({ widgetConcluidoId: widgetCursando.aulaId }));
      this.store.dispatch(removerWidgetCursar({ widgetCursarId: widgetCursando.aulaId }));
    }
  }

  concluido() {
    let widgetConcluido = this.getWidget();
    if (widgetConcluido) {
      this.store.dispatch(inserirWidgetConcluido({ widgetConcluido: widgetConcluido }));
      this.store.dispatch(removerWidgetCursar({ widgetCursarId: widgetConcluido.aulaId }));
      this.store.dispatch(removerWidgetCursando({ widgetCursandoId: widgetConcluido.aulaId }));
    }
  }

  getWidget(): WidgetModel | undefined {
    if (this.usuarioLogado && this.usuarioLogado.id > 0) {
      let widget: WidgetModel = new WidgetModel();
      widget.aula = this.aula;
      widget.usuarioId = this.usuarioLogado.id
      widget.aulaId = this.aula.id;
      return widget;
    }
    return undefined;
  }

  findSelecionado() {
    if (this.widget) {
      if (this.widget.widgetConcluido.find(item => item.aula?.id == this.aula.id))
        this.alterarSalvarSelecionado('concluido');
      if (this.widget.widgetCursando.find(item => item.aula?.id == this.aula.id))
        this.alterarSalvarSelecionado('cursando');
      if (this.widget.widgetCursar.find(item => item.aula?.id == this.aula.id))
        this.alterarSalvarSelecionado('cursar');
    }
  }

  alterarSalvarSelecionado(item: string) {
    switch (item) {
      case "cursar":
        this.widgetCursar = true;
        this.widgetCursando = false;
        this.widgetConcluido = false;
        break;
      case "cursando":
        this.widgetCursar = false;
        this.widgetCursando = true;
        this.widgetConcluido = false;
        break;
      case "concluido":
        this.widgetCursar = false;
        this.widgetCursando = false;
        this.widgetConcluido = true;
        break;
      default:
        this.widgetCursar = false;
        this.widgetCursando = false;
        this.widgetConcluido = false;
        break;
    }
  }

  aulaPosterior() {
    this.router.navigate([`visualizar-aula/${this.aula.aulaPosteriorId}`]);
    this.store.dispatch(atualizarAulaSelected({ aulaId: this.aula.aulaPosteriorId }));
  }

  aulaAnterior() {
    this.router.navigate([`visualizar-aula/${this.aula.aulaAnteriorId}`]);
    this.store.dispatch(atualizarAulaSelected({ aulaId: this.aula.aulaAnteriorId }));
  }

  scrollToTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
}
