import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  AulaModel, 
  AulaSessaoOrdemRequestModel,
  AulaSessaoModel, 
  UsuarioModel, 
  TipoSessaoAulaEnum
} from 'src/app/models';

import { 
  atualizarAulaSessaoOrdem, 
  excluirAulaSessao, 
  getManyAulaSessaoByAulaId, 
  getOneAulaById, 
  getOneUsuarioLogado, 
  selecionarManyAulaSessaoByAulaId
} from 'src/app/store';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-editar-aula',
  templateUrl: './editar-aula.component.html',
  styleUrls: ['./editar-aula.component.css']
})
export class EditarAulaComponent implements OnInit {

  aulaId: number = 0;

  aulaSubscription$: Subscription = new Subscription();
  aula$: Observable<AulaModel | undefined> = new Observable<AulaModel | undefined>();
  aula: AulaModel = new AulaModel();

  aulaSessaoSubscription$: Subscription = new Subscription();
  aulaSessao$: Observable<AulaSessaoModel[]> = new Observable<AulaSessaoModel[]>();
  aulaSessaoMany: AulaSessaoModel[] = [];

  usuarioLogadoSubscription$: Subscription = new Subscription();
  usuarioLogado$: Observable<UsuarioModel | undefined> = new Observable<UsuarioModel | undefined>();
  usuarioLogado: UsuarioModel | undefined = undefined;

  trustedDashboardHtml : SafeHtml[] = [];
  trustedUrlImageHtml: SafeHtml[] = [];

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
  }

  ngOnDestroy() {
    this.aulaSubscription$.unsubscribe();
    this.aulaSessaoSubscription$.unsubscribe();
    this.usuarioLogadoSubscription$.unsubscribe();
  }

  setupAula() {
    this.aula$ = this.store.select(getOneAulaById(this.aulaId));
    this.aulaSubscription$ = this.aula$.subscribe(item => {
      if(item) {
        this.aula = item;
      }
    });
  }

  setupAulaSessao() {
    this.store.dispatch(selecionarManyAulaSessaoByAulaId({ aulaId:  this.aulaId}));
    this.aulaSessao$ = this.store.select(getManyAulaSessaoByAulaId(this.aulaId));
    this.aulaSessaoSubscription$ = this.aulaSessao$.subscribe(itens => {
      this.trustedDashboardHtml = [];
      this.trustedUrlImageHtml = [];
      this.aulaSessaoMany = itens;
      this.aulaSessaoMany.sort((a, b) => (a.ordem < b.ordem) ? -1 : 1);
      this.aulaSessaoMany.forEach(item => {
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

  setupUsuarioLogado() {
    this.usuarioLogado$ = this.store.select(getOneUsuarioLogado);
    this.usuarioLogadoSubscription$ = this.usuarioLogado$.subscribe(item => {
      if(item) {
        this.usuarioLogado = item;
      }  
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
      minWidth: '500px',
      height: 'auto',
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
      let aulaAlterada = new AulaSessaoModel();
      aulaAlterada.aulaId = aulaSessao.aulaId;
      aulaAlterada.aulaSessaoTipo = aulaSessao.aulaSessaoTipo;
      aulaAlterada.conteudo = aulaSessao.conteudo;
      aulaAlterada.dataAtualizacao = aulaSessao.dataAtualizacao;
      aulaAlterada.dataCadastro = aulaSessao.dataCadastro;
      aulaAlterada.favoritado = aulaSessao.favoritado;
      aulaAlterada.id = aulaSessao.id;
      aulaAlterada.ordem = ordem++;
      aulaAlterada.titulo = aulaSessao.titulo;

      return aulaAlterada;
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
    //TODO, precisa retornar o id ao cadastrar uma sessão nova, assim conseguimos excluir no back
    this.dialog.open(ModalExcluirComponent, {
      data: `Sessão: ${sessao.titulo}`
    }).afterClosed().subscribe((evento) => {
      if(evento) {
        this.store.dispatch(excluirAulaSessao({ aulaSessaoId: sessao.id }));
      }
    });
  }

  voltarPaginaPainelProfessor() {
    this.router.navigate([`perfil-professor/${this.usuarioLogado?.email}`]);
  }
}
