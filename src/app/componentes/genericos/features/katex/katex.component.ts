import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';

import katex from 'katex';

@Component({
  selector: 'app-katex',
  templateUrl: './katex.component.html',
  styleUrl: './katex.component.scss'
})
export class KatexComponent implements OnChanges {
  @Input() equacao: string = '';

  exemploEquacao: string = "c = \\pm\\sqrt{a^2 + b^2}";

  @ViewChild('katexContainer', { static: false }) katexContainer!: ElementRef;

  ngAfterViewInit() {
    if (this.katexContainer && this.katexContainer.nativeElement) {
      katex.render(this.equacao, this.katexContainer.nativeElement, {
        throwOnError: false
      });
    }
  }

  ngOnChanges() {
    if (this.katexContainer && this.katexContainer.nativeElement) {
      katex.render(this.equacao, this.katexContainer.nativeElement, {
        throwOnError: false
      });
    }
  }
}
