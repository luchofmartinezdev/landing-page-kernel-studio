import { Component, signal } from '@angular/core';
import { Hero } from "./components/hero/hero";
import { Projects } from "./components/projects/projects";
import { Contact } from "./components/contact/contact";
import { Header } from "./components/header/header";
import { About } from "./components/about/about";
import { Footer } from "./components/footer/footer"; 

@Component({
  selector: 'app-root',
  imports: [Hero, Projects, Contact, Header, About, Footer],
  
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mi-landing-page');
}
