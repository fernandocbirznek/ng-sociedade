import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  UsuarioModel,
  WidgetModel,
  WidgetViewModel 
} from 'src/app/models';

import { 
  alterarTituloPagina,
  atualizarAulaSelected,
  getWidgetMany, 
  inserirWidgetConcluido, 
  inserirWidgetCursando, 
  inserirWidgetCursar, 
  removerWidgetConcluido, 
  removerWidgetCursando, 
  removerWidgetCursar, 
} from 'src/app/store';

@Component({
  selector: 'app-aluno-aula',
  templateUrl: './aluno-aula.component.html',
  styleUrls: ['./aluno-aula.component.css']
})
export class AlunoAulaComponent implements OnInit {
  @Input() usuarioLogado: UsuarioModel = new UsuarioModel();

  widgetSubscription$: Subscription = new Subscription();
  widget$: Observable<WidgetViewModel> = new Observable<WidgetViewModel>();
  widget: WidgetViewModel | undefined = undefined;

  constructor(
    public store: Store,
    public router: Router
  ) { }
  
  ngOnInit(): void {
    this.setupWidget();
  }

  ngOnDestroy() {
    this.widgetSubscription$.unsubscribe();
  }

  setupWidget() {
    this.widget$ = this.store.select(getWidgetMany);
    this.widgetSubscription$ = this.widget$.subscribe(item => {
      if (item)
        this.widget = item;
    });
  }

  visualizarAula(item: WidgetModel) {
    if(item.aula) {
      this.store.dispatch(alterarTituloPagina({ titulo: `${item.aula.titulo}`, areaFisicaId: item.aula.areaFisicaId }));
      this.store.dispatch(atualizarAulaSelected({ aulaId: item.aula.id }));
      this.router.navigate([`visualizar-aula/${item.aula.id}`], { queryParams: { aulaTitulo: item.aula.titulo }});
    }
  }

  moverParaCursando(widgetCursando: WidgetModel) {
    let widget = this.getWidget(widgetCursando);
    if (widget) {
      this.store.dispatch(inserirWidgetCursando({ widgetCursando: widget }));
      this.store.dispatch(removerWidgetConcluido({ widgetConcluidoId: widget.aulaId }));
      this.store.dispatch(removerWidgetCursar({ widgetCursarId: widget.aulaId }));
    }
  }

  moverParaCursar(widgetCursar: WidgetModel) {
    let widget = this.getWidget(widgetCursar);
    if (widget) {
      this.store.dispatch(inserirWidgetCursar({ widgetCursar: widget }));
      this.store.dispatch(removerWidgetConcluido({ widgetConcluidoId: widget.aulaId }));
      this.store.dispatch(removerWidgetCursando({ widgetCursandoId: widget.aulaId }));
    }
  }

  moverParaConcluido(widgetConcluido: WidgetModel) {
    let widget = this.getWidget(widgetConcluido);
    if (widget) {
      this.store.dispatch(inserirWidgetConcluido({ widgetConcluido: widget }));
      this.store.dispatch(removerWidgetCursar({ widgetCursarId: widget.aulaId }));
      this.store.dispatch(removerWidgetCursando({ widgetCursandoId: widget.aulaId }));
    }
  }

  getWidget(widget: WidgetModel): WidgetModel | undefined {
    if (this.usuarioLogado && this.usuarioLogado.id > 0) {
      let widgetAlterado: WidgetModel = new WidgetModel();
      widgetAlterado.aula = widget.aula;
      widgetAlterado.usuarioId = this.usuarioLogado.id
      widgetAlterado.aulaId = widget.aula!.id;
      return widgetAlterado;
    }
    return undefined;
  }
}
