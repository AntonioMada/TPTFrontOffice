import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appButtoncolor]'
})
export class ButtoncolorDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.backgroundColor = '#9982c1';
   }

}
