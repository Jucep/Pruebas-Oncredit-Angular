import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight: number = 0;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.appHighlight > 100) {
      this.el.nativeElement.style.backgroundColor = 'yellow';
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('lightblue');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(this.appHighlight > 100 ? 'yellow' : null);
  }

  private highlight(color: string | null) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}