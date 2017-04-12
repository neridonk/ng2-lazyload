import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[InfinityScroll]'
})
export class InfinityScrollDirective
{

  private element: HTMLElement;

  @Input()
  public currentRow: number = 0;

  @Input()
  public rowsToFetch: number = 10;

  @Output()
  public onfetch: EventEmitter<number> = new EventEmitter();

  constructor(private elementRef: ElementRef)
  {
    this.element = elementRef.nativeElement;
  }

  ngAfterViewInit()
  {
    window.onscroll = () =>
    {
      var lastDiv: HTMLElement = <HTMLElement>this.element.lastElementChild;

      var lastDivOffset = lastDiv.offsetTop + lastDiv.clientHeight;
      var pageOffset = window.pageYOffset + window.innerHeight;

      if (pageOffset > lastDivOffset - 20) {
        this.currentRow += this.rowsToFetch;

        this.onfetch.emit(this.currentRow);
      }
    }
  }

}
