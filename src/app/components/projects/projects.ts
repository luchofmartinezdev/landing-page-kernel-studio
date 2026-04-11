import { Component, computed, HostListener, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

type Category = 'propio' | 'cliente';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  templateUrl: './projects.html',
})
export class Projects {
  currentIndex = signal(0);
  isMobile = signal(false);
  activeTab = signal<Category>('cliente');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  allProjects = [
    {
      title: 'Prodeus',
      type: 'Web / Sports',
      desc: 'Plataforma de prode público con grupos, predicciones y ranking en tiempo real. Incluye panel de administración de torneos, partidos y sistema automático de puntuación.',
      tech: ['Angular', 'Supabase', 'NgRx Signals'],
      textColor: 'text-emerald-400',
      category: 'propio' as Category,
    },
    {
      title: 'TuMarketTCG',
      type: 'Marketplace',
      desc: 'Marketplace de cartas coleccionables (TCG) donde jugadores pueden publicar, buscar y negociar cartas de forma segura con sistema de valoraciones y chat integrado.',
      tech: ['Angular', 'Firebase', 'Mobile First'],
      textColor: 'text-purple-400',
      category: 'propio' as Category,
    },
    {
      title: 'Agile Poker Planning',
      type: 'Agile Tool',
      desc: 'Aplicación para estimaciones ágiles con story points.',
      tech: ['Angular', 'Real-time'],
      textColor: 'text-purple-500',
      category: 'propio' as Category,
    },
    {
      title: 'Steam Tax Calculator',
      type: 'Web / Herramienta',
      desc: 'Calculadora de impuestos para compras en Steam, adaptada a las regulaciones vigentes en Argentina.',
      tech: ['JS', 'Local Economy'],
      textColor: 'text-orange-600',
      category: 'propio' as Category,
    },
    {
      title: 'Poke-Trivia',
      type: 'Game / Fun',
      desc: 'Juego de preguntas y respuestas basado en la PokeAPI para fanáticos del coleccionismo.',
      tech: ['PokeAPI', 'Mobile First'],
      textColor: 'text-yellow-500',
      category: 'propio' as Category,
    },
    {
      title: 'PetLovers',
      type: 'Social / Rescate',
      desc: 'Plataforma para gestión de adopciones y rescates.',
      tech: ['Flutter', 'Maps'],
      textColor: 'text-pink-500',
      category: 'propio' as Category,
    },
    {
      title: 'TurnoOS',
      type: 'SaaS / Gestión',
      desc: 'Sistema de turnos y agenda online para pymes. Permite a clientes reservar turnos 24/7 y a negocios gestionar su disponibilidad desde un panel simple.',
      tech: ['Angular', 'Supabase', 'Tailwind'],
      textColor: 'text-[#00d2d3]',
      category: 'cliente' as Category,
    },
    {
      title: 'OrdenAR',
      type: 'Web / Operaciones',
      desc: 'Herramienta de gestión de pedidos e inventario para comercios argentinos. Centraliza órdenes, stock y proveedores en un solo lugar.',
      tech: ['Angular', 'Node.js', 'PostgreSQL'],
      textColor: 'text-orange-400',
      category: 'cliente' as Category,
    },
  ];

  filteredProjects = computed(() =>
    this.allProjects.filter(p => p.category === this.activeTab())
  );

  // Cuántas cards se ven a la vez según breakpoint y cantidad disponible
  itemsToShow = computed(() => {
    if (this.isMobile()) return 1;
    return Math.min(3, this.filteredProjects().length);
  });

  // Ancho de cada card calculado dinámicamente (gap-6 = 24px)
  cardWidth = computed(() => {
    const n = this.itemsToShow();
    if (n === 1) return '100%';
    if (n === 2) return 'calc(50% - 12px)';
    return 'calc(33.333% - 16px)';
  });

  // Cantidad de slides navegables
  totalSlides = computed(() =>
    Math.max(1, this.filteredProjects().length - this.itemsToShow() + 1)
  );

  // Array para los dots
  dots = computed(() => Array.from({ length: this.totalSlides() }, (_, i) => i));

  setTab(tab: Category) {
    this.activeTab.set(tab);
    this.currentIndex.set(0);
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile.set(window.innerWidth < 1024);
    }
  }

  // Traducción correcta: step = (100% + gap) / n, multiplicado por índice
  // gap-6 = 24px
  getTranslation() {
    if (!isPlatformBrowser(this.platformId)) return 'translateX(0)';
    const idx = this.currentIndex();
    if (idx === 0) return 'translateX(0)';
    const n = this.itemsToShow();
    const pct = (idx * 100) / n;
    const px = (idx * 24) / n;
    return `translateX(calc(-${pct}% - ${px}px))`;
  }

  next() {
    if (this.currentIndex() < this.totalSlides() - 1) {
      this.currentIndex.update(i => i + 1);
    } else {
      this.currentIndex.set(0);
    }
  }

  prev() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(i => i - 1);
    } else {
      this.currentIndex.set(this.totalSlides() - 1);
    }
  }
}
