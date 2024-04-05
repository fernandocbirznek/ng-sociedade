import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-aula-icone',
  templateUrl: './aula-icone.component.html',
  styleUrls: ['./aula-icone.component.css']
})
export class AulaIconeComponent implements OnInit {
  @Input() areaFisicaId: number = 0;
  @Input() areaFisicaNome: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
