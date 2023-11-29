import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { 
  ProfessorEditarSessaoComponent,
  ProfessorNovaSessaoComponent 
} from 'src/app/componentes';

import { 
  AreaFisicaModel, 
  AulaModel, 
  AulaSessaoModel, 
  UsuarioModel }
   from 'src/app/models';

import { 
  atualizarAula, 
  getManyAreaFisica, 
  getManyAulaSessaoByAulaId, 
  getOneAulaById, 
  getOneUsuarioLogado, 
  selecionarManyAulaSessaoByAulaId
} from 'src/app/store';

@Component({
  selector: 'app-professor-editar-aula',
  templateUrl: './professor-editar-aula.component.html',
  styleUrls: ['./professor-editar-aula.component.css']
})
export class ProfessorEditarAulaComponent implements OnInit {

  aulaId: number = 0;

  areaFisicaManySubscription$: Subscription = new Subscription();
  areaFisicaMany$: Observable<AreaFisicaModel[]> = new Observable<AreaFisicaModel[]>();
  areaFisicaMany: AreaFisicaModel[] = [];

  aulaSubscription$: Subscription = new Subscription();
  aula$: Observable<AulaModel | undefined> = new Observable<AulaModel | undefined>();
  aula: AulaModel = new AulaModel();

  aulaSessaoSubscription$: Subscription = new Subscription();
  aulaSessao$: Observable<AulaSessaoModel[]> = new Observable<AulaSessaoModel[]>();
  aulaSessao: AulaSessaoModel[] = [];

  formGroupAula: FormGroup = null as any;

  formTitulo = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  formResumo = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  formAreaFisica = new FormControl('', [Validators.required]);

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel> = new Observable<UsuarioModel>();
  usuarioLogado: UsuarioModel | undefined = undefined ;

  constructor(
    public dialog: MatDialog,
    public store: Store,
    private route: ActivatedRoute,
  ) {
    this.aulaId = this.route.snapshot.paramMap.get('id') ? +this.route.snapshot.paramMap.get('id')!: 0;
    this.criarFormulario();
  }

  ngOnInit(): void {
    this.setupAula();
    this.setupAulaSessao();
    this.setupUsuarioLogado();
    this.setupAreaFisica();
    this.setupUsuarioLogado();
  }

  ngOnDestroy() {
    this.usuarioLogadoSubscription$.unsubscribe();
    this.areaFisicaManySubscription$.unsubscribe();
  }

  setupAula() {
    this.aula$ = this.store.select(getOneAulaById(this.aulaId));
    this.aulaSubscription$ = this.aula$.subscribe(item => {
      if(item) {
        this.aula = item;
        this.formGroupAula.get("formTitulo")!.setValue(this.aula.titulo);
        this.formGroupAula.get("formResumo")!.setValue(this.aula.resumo);
        this.formGroupAula.get("formAreaFisica")!.setValue(this.aula.areaFisicaId);
      }
    });
  }

  setupAulaSessao() {
    this.store.dispatch(selecionarManyAulaSessaoByAulaId({ aulaId:  this.aulaId}));
    this.aulaSessao$ = this.store.select(getManyAulaSessaoByAulaId(this.aulaId));
    this.aulaSessaoSubscription$ = this.aulaSessao$.subscribe(itens => {
      this.aulaSessao = itens;
      this.aulaSessao.sort((a, b) => (a.ordem < b.ordem) ? -1 : 1)
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

  setupAreaFisica() {
    this.areaFisicaMany$ = this.store.select(getManyAreaFisica);
    this.areaFisicaManySubscription$ = this.areaFisicaMany$.subscribe(itens => {
      this.areaFisicaMany = itens;
    });
  }

  criarFormulario() {
    this.formGroupAula = new FormGroup({
      formTitulo: this.formTitulo,
      formResumo: this.formResumo,
      formAreaFisica: this.formAreaFisica
    })
  }

  atualizarAula() {
    let aula: AulaModel = new AulaModel();
    aula.titulo = this.formGroupAula.get("formTitulo")?.value;
    aula.resumo = this.formGroupAula.get("formResumo")?.value;
    aula.areaFisicaId = this.formGroupAula.get("formAreaFisica")?.value;
    aula.id = this.aula.id;

    this.formGroupAula.reset();
    
    this.store.dispatch(atualizarAula({ aula: aula }));
  }

  novaSessao() {
    this.dialog.open(ProfessorNovaSessaoComponent, {
      minWidth: '500px',
      height: 'auto',
      data: {
        aula: this.aula, 
        sessaoMany: this.aulaSessao
      }
    });
  }

  ordenarSessao(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.aulaSessao, event.previousIndex, event.currentIndex);
    this.reordenarSessoes();
  }

  public reordenarSessoes(): void {
    let ordem = 0;
    this.aulaSessao = this.aulaSessao.map((sessao) => {
      return {
        ...sessao,
        ordem: ordem
      }
    });
    //TODO, precisa atualizar os itens no banco, fazer a partir de um botão e criar uma variavel verificar q foi editado
  }

  editarSessao(sessao: AulaSessaoModel) {
    this.dialog.open(ProfessorEditarSessaoComponent, {
      minWidth: '500px',
      height: 'auto',
      data: {
        aula: this.aula, 
        sessaoEditar: sessao
      }
    });
  }

  deletarSessao(sessao: AulaSessaoModel) {
    //TODO, fazer modal de confirmar delete
  }
}
