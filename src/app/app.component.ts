import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar.component';
import { ModalComponent } from './layout/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    ModalComponent,
  ],
  template: `
    <app-navbar />
    <main class="max-w-6xl mx-auto p-4 md:p-8">
      <router-outlet />
    </main>
    <app-modal/>
  `,
})
export class AppComponent {

}
