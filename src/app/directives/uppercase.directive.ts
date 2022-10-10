import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appUppercase]'
})
export class UppercaseDirective {

  constructor() {
  }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    let first, rest;
    [first, ...rest] = event.target.value;
    event.target.value = first.toUpperCase() + rest.join('');
  }

}
