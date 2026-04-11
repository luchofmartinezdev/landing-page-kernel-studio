import { Component } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-about',
  imports: [AnimateOnScrollDirective],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {}
