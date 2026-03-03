import { Component, HostListener, Inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
})
export class Projects {
  currentIndex = signal(0);
  isMobile = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  projects = [
    {
      title: 'Agile Poker Planning',
      type: 'Agile Tool',
      desc: 'Aplicación para estimaciones ágiles con story points.',
      tech: ['Herramienta', 'Angular'],
      textColor: 'text-purple-500'
    },
    {
      title: 'Metrics Dashboard',
      type: 'Agile Tool',
      desc: 'Dashboard personalizado de métricas de gestión de proyectos de software.',
      tech: ['Sheet', 'JIRA', 'Flutter Web'],
      textColor: 'text-purple-500'
    },
    {
      title: 'Steam Tax Calculator',
      type: 'Web / Herramienta',
      desc: 'Calculadora de impuestos para compras en Steam, adaptada a las regulaciones vigentes en Argentina.',
      tech: ['Flutter', 'Mobile', 'Impuestos'],
      textColor: 'text-orange-600'
    },
    {
      title: 'TuMarketTCG',
      type: 'Social / Trading Card Game',
      desc: 'Plataforma para compra y venta de cartas de coleccionismo.',
      tech: ['Angular', 'Firebase'],
      textColor: 'text-yellow-500'
    },
    {
      title: 'PetLovers',
      type: 'Social / Rescate',
      desc: 'Plataforma para gestión de adopciones y rescates.',
      tech: ['Flutter', 'Maps'],
      textColor: 'text-pink-500'
    }
  ];

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    // Solo ejecutamos si estamos en el navegador (client-side)
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile.set(window.innerWidth < 1024); // Usamos 1024 para cubrir tablets también
    }
  }
  getTranslation() {
    if (!isPlatformBrowser(this.platformId)) return 'translateX(0)';

    // Calculamos el porcentaje de desplazamiento según el breakpoint
    // En mobile desplazamos 100% por vez, en desktop 33.333%
    const multiplier = this.isMobile() ? 100 : 33.333;

    // Agregamos un pequeño ajuste si usás gaps (opcional)
    // Pero con 33.333% y gap-6 en el contenedor suele alinear bien
    return `translateX(-${this.currentIndex() * multiplier}%)`;
  }

  next() {
    const itemsToShow = this.isMobile() ? 1 : 3;
    if (this.currentIndex() < this.projects.length - itemsToShow) {
      this.currentIndex.update(i => i + 1);
    } else {
      this.currentIndex.set(0);
    }
  }

  prev() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(i => i - 1);
    } else {
      const itemsToShow = this.isMobile() ? 1 : 3;
      this.currentIndex.set(Math.max(0, this.projects.length - itemsToShow));
    }
  }
}