import { Directive, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// Classes usadas dinámicamente — mantener para que Tailwind las incluya en el bundle:
// opacity-0 translate-y-6 opacity-100 translate-y-0 transition-all duration-700 ease-out

@Directive({
  selector: '[appAnimateOnScroll]',
  standalone: true,
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const el = this.el.nativeElement;
    el.classList.add('opacity-0', 'translate-y-6', 'transition-all', 'duration-700', 'ease-out');

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('opacity-0', 'translate-y-6');
          el.classList.add('opacity-100', 'translate-y-0');
          this.observer?.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    this.observer.observe(el);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
