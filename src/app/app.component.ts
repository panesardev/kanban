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
    <main class="max-w-6xl mt-20 mx-auto px-4 py-6 md:p-8">
      <router-outlet />
    </main>
    <app-modal/>
  `,
})
export class AppComponent {

}
