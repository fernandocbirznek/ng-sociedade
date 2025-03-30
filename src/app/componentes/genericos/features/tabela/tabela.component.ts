import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { 
  TabelaModel 
} from '../../../../models';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.scss'
})
export class TabelaComponent implements OnInit {

  @Input() tabela = TabelaModel.create({});

  @Output() onAcessar = new EventEmitter();
  @Output() onCriar = new EventEmitter();
  @Output() onEditar = new EventEmitter();
  @Output() onExcluir = new EventEmitter();
  @Output() onPublicar = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.tabela.dataSource.paginator = this.paginator;
    this.tabela.dataSource.sort = this.sort;
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tabela.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.tabela.dataSource.paginator) {
      this.tabela.dataSource.paginator.firstPage();
    }
  }

  acessarItem(item: any) {
    this.onAcessar.emit(item);
  }

  criarItem() {
    this.onCriar.emit();
  }

  editarItem(item: any) {
    this.onEditar.emit(item);
  }

  excluirItem(item: any) {
    this.onExcluir.emit(item);
  }

  publicar(item: any) {
    this.onPublicar.emit(item);
  }
}
