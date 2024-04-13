import { AsyncPipe } from '@angular/common';
import { Component, inject, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar.component';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterOutlet,
    NavbarComponent,
  ],
  template: `
    <app-navbar />
    <main class="max-w-6xl mt-20 mx-auto px-4 py-6 md:p-8">
      <router-outlet />
    </main>
  `,
})
export class AppComponent {
  private container = inject(ViewContainerRef);
  private modal = inject(ModalService);

  constructor() {
    this.modal.setContainer(this.container);
  }
}
