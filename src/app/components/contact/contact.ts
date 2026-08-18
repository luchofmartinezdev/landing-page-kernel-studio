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
  errorMessage = signal<string | null>(null);

  async onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);

    this.status.set('sending');
    this.errorMessage.set(null);

    try {
      const response = await fetch('https://formspree.io/f/xzdaggjv', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        this.status.set('success');
        form.reset(); // Limpia el formulario
      } else {
        this.status.set('idle');
        this.errorMessage.set('Hubo un error al enviar el mensaje. Intentá de nuevo.');
      }
    } catch (error) {
      this.status.set('idle');
      this.errorMessage.set('Error de conexión. Revisá tu internet.');
    }
  }
}
