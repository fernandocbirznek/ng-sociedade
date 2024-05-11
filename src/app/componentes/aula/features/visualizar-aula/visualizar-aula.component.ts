import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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
  AulaComentarioModel,
  AulaModel, 
  AulaSessaoModel, 
  TipoSessaoAulaEnum, 
  UsuarioAulaSessaoFavoritadoModel, 
  UsuarioModel, 
  WidgetModel,
  WidgetViewModel
} from 'src/app/models';

import { 
  atualizarAulaCurtir, 
  excluirAulaComentario, 
  getManyAulaComentarioByAulaId, 
  getManySessaoIdInUsuarioAulaSessaoFavoritado, 
  getOneAulaById, 
  getOneUsuarioLogado, 
  getWidgetMany, 
  inserirAulaComentario, 
  inserirUsuarioAulaSessaoFavoritado, 
  inserirWidgetConcluido, 
  inserirWidgetCursando, 
  inserirWidgetCursar, 
  removerUsuarioAulaSessaoFavoritado, 
  removerWidgetConcluido, 
  removerWidgetCursando, 
  removerWidgetCursar, 
  selecionarManyAulaComentarioByAulaId, 
  selecionarOneAulaById 
} from 'src/app/store';

import Editor from 'src/app/componentes/genericos/ckeditor/build/ckeditor';

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

  usuarioAulaSessaoFavoritadoSubscription$: Subscription = new Subscription();
  usuarioAulaSessaoFavoritado$: Observable<number[]> = new Observable<number[]>();
  usuarioAulaSessaoFavoritado: number[] = [];

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel> = new Observable<UsuarioModel>();
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
    this.store.dispatch(selecionarOneAulaById({ aulaId: this.aulaId }));
    this.setupAulaComentario();
    this.setupAula();
    this.setupUsuarioAulaSessaoFavoritado();
    this.setupUsuarioLogado();
    this.setupWidget();
  }

  ngOnDestroy() {
    this.aulaSubscription$.unsubscribe();
    this.usuarioAulaSessaoFavoritadoSubscription$.unsubscribe();
    this.usuarioLogadoSubscription$.unsubscribe();
    this.widgetSubscription$.unsubscribe();
  }

  private criarFormularioComentario() {
    this.formComentario = new FormGroup({
      comentario: this.formControlComentario,
    })
  }

  setupAula() {
    this.aula$ = this.store.select(getOneAulaById(this.aulaId));
    this.aulaSubscription$ = this.aula$.subscribe(item => {
      if(item)
        this.setupAulaSessao(item);
    });
  }

  setupAulaComentario() {
    this.store.dispatch(selecionarManyAulaComentarioByAulaId({ aulaId: this.aulaId }))
    this.aulaComentarioMany$ = this.store.select(getManyAulaComentarioByAulaId(this.aulaId));
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

  setupUsuarioAulaSessaoFavoritado() {
    this.usuarioAulaSessaoFavoritado$ = this.store.select(getManySessaoIdInUsuarioAulaSessaoFavoritado);
    this.usuarioAulaSessaoFavoritadoSubscription$ = this.usuarioAulaSessaoFavoritado$.subscribe(itens => {
      this.usuarioAulaSessaoFavoritado = itens;
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
    //TODO, precisa criar nova tabela para impedir usuário de curtir mais de uma vez
    let request: AulaModel = {...this.aula};
    request.curtido = this.aula.curtido + 1;

    this.store.dispatch(atualizarAulaCurtir({ aula: request }));
  }

  favoritarAula() {
    //TODO, fazer depois que criar perfil usuario Aluno
  }

  visualizarPerfil() {
    this.dialog.open(ProfessorPerfilVisualizarComponent, {
      data: this.aula.professorId,
      width: '80%',
      height: 'auto',
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
    this.router.navigate(['mecanica'], { queryParams: { areaFisicaId: this.aula.areaFisicaId }});
  }

  setupAulaSessao(item: AulaModel) {
    this.aula = item;
    this.trustedVisualizarAulaHtml = [];
    if (item.aulaSessaoMany.length > 0) {
      this.aulaSessaoMany = [...item.aulaSessaoMany];
      this.aulaSessaoMany.sort((a, b) => (a.ordem < b.ordem) ? -1 : 1);
      this.aulaSessaoMany.forEach(item => {
        if (item.aulaSessaoTipo != this.tipoSessaoAulaEnum.Imagem) {
          this.trustedVisualizarAulaHtml.push(this.sanitizer.bypassSecurityTrustHtml(item.conteudo));
          this.trustedUrlImageHtml.push('');
        }
        if (item.aulaSessaoTipo == this.tipoSessaoAulaEnum.Imagem) {
          this.trustedVisualizarAulaHtml.push('');
          this.trustedUrlImageHtml.push(this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + item.conteudo));
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
    if (this.usuarioLogado && this.usuarioLogado.id > 0) {
      aulaComentario.aulaId = this.aula.id;
      aulaComentario.usuarioId = this.usuarioLogado.id;
      aulaComentario.descricao = this.formComentario.get("comentario")?.value;

      this.store.dispatch(inserirAulaComentario({ aulaComentario: aulaComentario }));
    }
    this.escreverComentario = false;
  }

  editarComentario(item: AulaComentarioModel) {
    if (this.usuarioLogado && this.usuarioLogado.id > 0)
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
}
