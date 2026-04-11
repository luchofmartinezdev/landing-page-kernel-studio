import { Component, signal } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-contact',
  imports: [AnimateOnScrollDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
// Signal para manejar el estado del formulario
  status = signal<'idle' | 'sending' | 'success'>('idle');

  async onSubmit(event: Event) {
    event.preventDefault(); // Evitamos que la página se recargue
    this.status.set('sending');

    // Simulamos el envío (Aquí es donde iría tu lógica de Formspree, Netlify o API)
    // Usamos setTimeout para que el usuario vea que "algo pasa"
    setTimeout(() => {
      this.status.set('success');
      
      // Opcional: Volver al estado normal después de unos segundos
      // setTimeout(() => this.status.set('idle'), 5000);
    }, 1500);
  }
}
