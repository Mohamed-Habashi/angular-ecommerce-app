import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Login} from './components/login/login';
import {Header} from './components/header/header';
import {Footer} from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('php-product-project');
}
