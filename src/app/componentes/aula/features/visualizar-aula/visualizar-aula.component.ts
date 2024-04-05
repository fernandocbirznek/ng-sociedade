import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  ProfessorPerfilVisualizarComponent 
} from 'src/app/componentes';

import { 
  AulaModel, 
  AulaSessaoModel, 
  TipoSessaoAulaEnum, 
  UsuarioModel, 
  WidgetModel,
  WidgetViewModel
} from 'src/app/models';

import { 
  atualizarAulaCurtir, 
  getOneAulaById, 
  getOneUsuarioLogado, 
  getWidgetMany, 
  inserirWidgetConcluido, 
  inserirWidgetCursando, 
  inserirWidgetCursar, 
  removerWidgetConcluido, 
  removerWidgetCursando, 
  removerWidgetCursar, 
  selecionarOneAulaById 
} from 'src/app/store';

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

  trustedDashboardHtml : SafeHtml[] = [];

  readonly tipoSessaoAulaEnum = TipoSessaoAulaEnum;

  constructor(
    public store: Store,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    public router: Router,
    private dialog: MatDialog,
  ) { 
    this.aulaId = this.route.snapshot.paramMap.get('id') ? +this.route.snapshot.paramMap.get('id')!: 0;
  }

  ngOnInit(): void {
    this.store.dispatch(selecionarOneAulaById({ aulaId: this.aulaId }))
    this.setupObservableAula();
    this.setupUsuarioLogado();
    this.setupWidget();
  }

  ngOnDestroy() {
    this.aulaSubscription$.unsubscribe();
    this.usuarioLogadoSubscription$.unsubscribe();
    this.widgetSubscription$.unsubscribe();
  }

  setupObservableAula() {
    this.aula$ = this.store.select(getOneAulaById(this.aulaId));
    this.aulaSubscription$ = this.aula$.subscribe(item => {
      if(item)
        this.setupAula(item);
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
        this.setupAula(aula);
      }
    });
  }

  voltarPaginaMecanica() {
    this.router.navigate(['mecanica'], { queryParams: { areaFisicaId: this.aula.areaFisicaId }});
  }

  setupAula(item: AulaModel) {
    this.aula = item;
    this.trustedDashboardHtml = [];
    if (item.aulaSessaoMany.length > 0) {
      this.aulaSessaoMany = [...item.aulaSessaoMany];
      this.aulaSessaoMany.sort((a, b) => (a.ordem < b.ordem) ? -1 : 1);
      this.aulaSessaoMany.forEach(item => {
        this.trustedDashboardHtml.push(this.sanitizer.bypassSecurityTrustHtml(item.conteudo));
      });
    }
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
    if (this.usuarioLogado) {
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
