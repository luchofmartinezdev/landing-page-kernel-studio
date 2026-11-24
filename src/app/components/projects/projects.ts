import { Component, computed, signal } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

type Category = 'propio' | 'cliente';

interface Project {
  title: string;
  type: string;
  desc: string;
  tech: string[];
  textColor: string;
  category: Category;
  /** URL del sitio web (opcional). */
  webUrl?: string;
  /** URL de descarga de la APK o ficha de la app (opcional). */
  apkUrl?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  templateUrl: './projects.html',
})
export class Projects {
  private readonly INITIAL_VISIBLE = 6;

  activeTab = signal<Category>('cliente');
  showAll = signal(false);

  allProjects: Project[] = [
    {
      title: 'Cuentas Claras',
      type: 'Web / Finanzas',
      desc: 'Aplicación para llevar el control de tus gastos. Permite registrar gastos, y llevar de forma clara y sencilla tus propias finanzas.',
      tech: ['Flutter Web', 'Supabase'],
      textColor: 'text-blue-400',
      category: 'propio',
    },
    {
      title: 'Prodeus',
      type: 'Web / Sports',
      desc: 'Plataforma de prode público con grupos, predicciones y ranking en tiempo real. Incluye panel de administración de torneos, partidos y sistema automático de puntuación.',
      tech: ['Angular', 'Supabase', 'NgRx Signals'],
      textColor: 'text-emerald-400',
      category: 'propio',
    },
    {
      title: 'TuMarketTCG',
      type: 'Marketplace',
      desc: 'Marketplace de cartas coleccionables (TCG) donde jugadores pueden publicar, buscar y negociar cartas de forma segura con sistema de valoraciones y chat integrado.',
      tech: ['Angular', 'Firebase', 'Mobile First'],
      textColor: 'text-purple-400',
      category: 'propio',
      webUrl: 'https://tumarkettcg.pages.dev/',
    },
    {
      title: 'Agile Poker Planning',
      type: 'Agile Tool',
      desc: 'Aplicación para estimaciones ágiles con story points.',
      tech: ['Angular', 'Real-time'],
      textColor: 'text-purple-500',
      category: 'propio',
    },
    {
      title: 'Steam Tax Calculator',
      type: 'Web / Herramienta',
      desc: 'Calculadora de impuestos para compras en Steam, adaptada a las regulaciones vigentes en Argentina.',
      tech: ['JS', 'Local Economy'],
      textColor: 'text-orange-600',
      category: 'propio',
    },
    {
      title: 'Poke-Trivia',
      type: 'Game / Fun',
      desc: 'Juego de preguntas y respuestas basado en la PokeAPI para fanáticos del coleccionismo.',
      tech: ['PokeAPI', 'Mobile First'],
      textColor: 'text-yellow-500',
      category: 'propio',
    },
    {
      title: 'PetLovers',
      type: 'Social / Rescate',
      desc: 'Plataforma para gestión de adopciones y rescates.',
      tech: ['Flutter', 'Maps'],
      textColor: 'text-pink-500',
      category: 'propio',
    },
    {
      title: 'Animemory',
      type: 'Web / Anime y Manga',
      desc: 'Seguimiento de anime y manga en un solo lugar: guardá por qué episodio o capítulo vas, enterate cuándo sale el próximo y armá tu ranking personal.',
      tech: ['Angular', 'Firebase'],
      textColor: 'text-rose-400',
      category: 'propio',
      webUrl: 'https://animemory.pages.dev/',
    },
    {
      title: 'Palabreo',
      type: 'Juego',
      desc: 'Juego de palabras para jugar desde el celular.',
      tech: ['Flutter'],
      textColor: 'text-lime-400',
      category: 'propio',
    },
    {
      title: 'Yala!',
      type: 'Juego / Herramienta',
      desc: 'App que combina juego y utilidad, pensada para usar en el día a día.',
      tech: ['Flutter'],
      textColor: 'text-amber-400',
      category: 'propio',
    },
    {
      title: 'Preguntero',
      type: 'Juego',
      desc: 'Juego de preguntas y respuestas para desafiar tus conocimientos.',
      tech: ['Flutter'],
      textColor: 'text-sky-400',
      category: 'propio',
    },
    {
      title: 'GeoQuiz',
      type: 'Juego',
      desc: 'Quiz de geografía para aprender y jugar.',
      tech: ['Flutter'],
      textColor: 'text-teal-400',
      category: 'propio',
    },
    {
      title: 'TurnoOS',
      type: 'SaaS / Gestión',
      desc: 'Sistema de turnos y agenda online para pymes. Permite a clientes reservar turnos 24/7 y a negocios gestionar su disponibilidad desde un panel simple.',
      tech: ['Angular', 'Supabase', 'Tailwind'],
      textColor: 'text-[#00d2d3]',
      category: 'cliente',
    },
    {
      title: 'OrdenAR',
      type: 'Web / Operaciones',
      desc: 'Herramienta de gestión de pedidos e inventario para comercios argentinos. Centraliza órdenes, stock y proveedores en un solo lugar.',
      tech: ['Angular', 'Node.js', 'PostgreSQL'],
      textColor: 'text-orange-400',
      category: 'cliente',
    },
  ];

  filteredProjects = computed(() =>
    this.allProjects.filter(p => p.category === this.activeTab())
  );

  counts = computed(() => ({
    cliente: this.allProjects.filter(p => p.category === 'cliente').length,
    propio: this.allProjects.filter(p => p.category === 'propio').length,
  }));

  visibleProjects = computed(() =>
    this.showAll() ? this.filteredProjects() : this.filteredProjects().slice(0, this.INITIAL_VISIBLE)
  );

  hiddenCount = computed(() => this.filteredProjects().length - this.visibleProjects().length);
  canCollapse = computed(
    () => this.showAll() && this.filteredProjects().length > this.INITIAL_VISIBLE
  );

  setTab(tab: Category) {
    this.activeTab.set(tab);
    this.showAll.set(false);
  }

  toggleShowAll() {
    this.showAll.update(v => !v);
  }

  initials(title: string) {
    return title.replace(/[^A-Za-zÁÉÍÓÚáéíóú0-9 ]/g, '').trim().slice(0, 2).toUpperCase();
  }
}
