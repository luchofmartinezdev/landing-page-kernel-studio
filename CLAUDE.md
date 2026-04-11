# CLAUDE.md — Kernel Studio Landing Page

## Descripción del proyecto

Landing page de **Kernel Studio**, estudio de software de Córdoba, Argentina. Es una SPA de una sola página sin routing, con SSR habilitado (Angular Universal + Express).

El sitio presenta: sección Hero, Nosotros, Proyectos (carrusel), Contacto y Footer.

---

## Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | Angular 21 (standalone components) |
| Estilos | Tailwind CSS v4 |
| Lenguaje | TypeScript ~5.9 |
| SSR | @angular/ssr + Express v5 |
| Testing | Vitest |
| Package manager | npm 11 |

---

## Comandos clave

```bash
npm start           # Dev server (ng serve)
npm run build       # Build de producción
npm run watch       # Build en modo watch (development)
npm test            # Tests con Vitest
node dist/mi-landing-page/server/server.mjs  # Servir SSR en producción
```

---

## Estructura de componentes

```
src/app/
├── app.ts / app.html / app.css     # Root component (sin RouterOutlet, layout directo)
├── app.routes.ts                   # Rutas vacías (SPA sin navegación interna)
├── app.config.ts                   # Configuración del cliente
├── app.config.server.ts            # Configuración SSR
└── components/
    ├── header/     # Menú de navegación con hamburger (signal isMenuOpen)
    ├── hero/       # Sección principal con nombre y tagline
    ├── about/      # Descripción de Kernel Studio + CTA a diagnóstico
    ├── projects/   # Carrusel de proyectos (signal currentIndex, isMobile)
    ├── contact/    # Formulario de contacto (signal status: idle/sending/success)
    └── footer/     # Links de navegación, redes sociales, scroll-to-top
```

Cada componente tiene su propio directorio con `.ts`, `.html`, `.css` y `.spec.ts`.

---

## Convenciones del proyecto

- **Signals de Angular** para todo el estado reactivo (no se usa RxJS para estado local).
- **Standalone components** — no hay NgModules.
- **SSR-aware**: usar `isPlatformBrowser(platformId)` antes de acceder a `window` o APIs de DOM.
- **Sin formularios reactivos** — el formulario de contacto usa `(submit)` nativo con `event.preventDefault()`.
- **Prettier**: `printWidth: 100`, `singleQuote: true`, parser `angular` para `.html`.
- **Paleta de colores principal**: `slate-900` (fondo), `#00d2d3` (acento cyan), `blue-500`/`blue-600` (acento azul).

---

## Notas de arquitectura

- La navegación es por anclas (`#home`, `#about`, `#projects`, `#contact`) con `scroll-behavior: smooth`.
- El carrusel de Projects calcula el desplazamiento: 100% en mobile, 33.333% en desktop (breakpoint `lg: 1024px`).
- El formulario de contacto simula el envío con `setTimeout` — **pendiente integrar con Formspree, Netlify Forms u otra API real**.
- El botón scroll-to-top está en `Footer` como elemento `fixed`, controlado por un signal `showScrollButton`.
- SSR entry point: `src/server.ts` (Express); `src/main.server.ts` bootstrapea la app en el servidor.

---

## Proyectos en el carrusel (datos en `projects.ts`)

| Título | Tipo | Tecnologías |
|--------|------|-------------|
| Agile Poker Planning | Agile Tool | Angular, Real-time |
| Steam Tax Calculator | Web / Herramienta | JS, Local Economy |
| Poke-Trivia | Game / Fun | PokeAPI, Mobile First |
| GolApp | Flutter / Firebase | Clean Architecture |
| PetLovers | Social / Rescate | Flutter, Maps |

---

## Cosas a tener en cuenta al modificar

- Al agregar nuevos componentes, seguir la misma estructura de carpeta (`nombre/nombre.ts`, `.html`, `.css`, `.spec.ts`).
- No usar `CommonModule` salvo cuando sea necesario (Projects lo usa para `@for` en versiones anteriores — en Angular 17+ `@for` es built-in).
- El `outputMode` en `angular.json` es `"server"`, lo que activa SSR por defecto. No cambiar a `"static"` sin revisar implicancias.
- Los presupuestos de bundle están en `angular.json`: warning en 500kB, error en 1MB.
