import { Component, input } from '@angular/core';
import { Modal } from '../../types/modal.class';

@Component({
  selector: 'app-base-modal',
  standalone: true,
  template: `
    <div class="{{ modal.isClosed() ? 'modal-overlay-out' : 'modal-overlay-in' }} fixed inset-0 z-[100] bg-[#132a3483]"></div>
    <div class="{{ modal.isClosed() ? 'modal-out' : 'modal-in' }} fixed z-[101] inset-0 px-6 py-12 md:px-10 md:py-20">
      <div class="bg-neutral rounded p-6 md:p-8 mx-auto {{ classes() }}">
        @if (heading()) {
          <div class="flex justify-between items-center gap-6 pb-2 mb-4 border-b-2 border-slate-100">
            <h1 class="font-bold text-lg">{{ heading() }}</h1>
            <button class="float-right text-red-500 hover:underline" (click)="modal.close()">Close</button>
          </div>
        }
        <ng-content/>
      </div>
    </div>
  `,
})
export class BaseModalComponent extends Modal {
  classes = input<string>();
  heading = input.required<string>();
}
