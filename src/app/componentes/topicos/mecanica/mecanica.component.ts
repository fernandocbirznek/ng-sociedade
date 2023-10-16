import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mecanica',
  templateUrl: './mecanica.component.html',
  styleUrls: ['./mecanica.component.css']
})
export class MecanicaComponent implements OnInit {

  public contador: number = 1;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  moverAulas(num: number) {
    //TODO está hardcode a quantidade de itens
    if(this.contador + num >= 1 && this.contador + num <= 3)
      this.contador = this.contador + num;
  }
}
