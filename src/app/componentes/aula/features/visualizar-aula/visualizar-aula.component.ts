import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AulaModel, AulaSessaoModel, TipoSessaoAulaEnum } from 'src/app/models';
import { atualizarAulaCurtir, getOneAulaById, selecionarOneAulaById } from 'src/app/store';

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

  aulaSessaoMany: AulaSessaoModel[] = [];

  trustedDashboardHtml : SafeHtml[] = [];

  readonly tipoSessaoAulaEnum = TipoSessaoAulaEnum;

  constructor(
    public store: Store,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    public router: Router,
  ) { 
    this.aulaId = this.route.snapshot.paramMap.get('id') ? +this.route.snapshot.paramMap.get('id')!: 0;
  }

  ngOnInit(): void {
    this.store.dispatch(selecionarOneAulaById({ aulaId: this.aulaId }))
    this.setupAula();
  }

  setupAula() {
    this.aula$ = this.store.select(getOneAulaById(this.aulaId));
    this.aulaSubscription$ = this.aula$.subscribe(item => {
      if(item) {
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

  voltar() {
    this.router.navigate(['mecanica'], { queryParams: { areaFisicaId: this.aula.areaFisicaId }});
  }
}
