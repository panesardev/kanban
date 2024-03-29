import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ModalComponent } from './layout/modal.component';
import { NavbarComponent } from './layout/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterOutlet,
    NavbarComponent,
    ModalComponent,
  ],
  template: `
    <app-navbar />
    <main class="max-w-6xl mt-20 mx-auto px-4 py-6 md:p-8">
      <router-outlet />
    </main>
    <app-modal/>
  `,
})
export class AppComponent {
  
}
