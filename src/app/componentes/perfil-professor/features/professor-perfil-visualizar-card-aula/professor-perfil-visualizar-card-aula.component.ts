import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AulaModel, 
} from 'src/app/models';

import { 
  getManyAulaByProfessorId, 
  selecionarManyAulaByProfessorId
} from 'src/app/store';

@Component({
  selector: 'app-professor-perfil-visualizar-card-aula',
  templateUrl: './professor-perfil-visualizar-card-aula.component.html',
  styleUrls: ['./professor-perfil-visualizar-card-aula.component.css']
})
export class ProfessorPerfilVisualizarCardAulaComponent implements OnInit {
  @Input() professorId: number = 0;
  @Output() ngAcessarAula = new EventEmitter<AulaModel>();

  aulaManyByUsuarioIdSubscription$: Subscription = new Subscription();
  aulaManyByUsuarioId$: Observable<AulaModel[]> = new Observable<AulaModel[]>();
  aulaManyByUsuarioId: AulaModel[] = [];

  pageAulaMany: AulaModel[] = [];
  pageSize: number = 4;
  pageMax: number = 1;
  pageAtual: number = 0;

  constructor(
    public store: Store
  ) { }

  ngOnInit(): void {
    this.setupAula();
  }

  ngOnDestroy() {
    this.aulaManyByUsuarioIdSubscription$.unsubscribe();
  }

  setupAula() {
    this.store.dispatch(selecionarManyAulaByProfessorId({ professorId: this.professorId }));
    this.aulaManyByUsuarioId$ = this.store.select(getManyAulaByProfessorId(this.professorId));
    this.aulaManyByUsuarioIdSubscription$ = this.aulaManyByUsuarioId$.subscribe(itens => {
      this.aulaManyByUsuarioId = itens;
      this.setupPage();
    });
  }

  mudarPagina(page: number) {
    if (page < 0 && this.pageAtual - 1 >= 0)
      this.pageAtual--;
    if (page > 0 && this.pageAtual + 1 < this.pageMax)
      this.pageAtual++;

    this.pageAulaMany = this.aulaManyByUsuarioId.slice(this.pageSize * this.pageAtual, (this.pageAtual + 1) * this.pageSize);
  }

  setupPage() {
    this.pageMax = Math.ceil(this.aulaManyByUsuarioId.length/this.pageSize);
    this.pageAulaMany = this.aulaManyByUsuarioId.slice(this.pageAtual, this.pageSize);
  }

  visualizarAula(item: AulaModel) {
    this.ngAcessarAula.emit(item);
  }
}
