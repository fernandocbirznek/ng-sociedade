import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[fxFlex]'
})
export class FxFlexDirective implements OnInit {
  @Input() fxFlex!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    console.log('fxFlex value:', this.fxFlex);
    // Define o estilo 'flex' no elemento que usa a diretiva
    this.renderer.setStyle(this.el.nativeElement, 'flex', this.fxFlex);
    console.log(this.el.nativeElement.style.flex);
  }
}