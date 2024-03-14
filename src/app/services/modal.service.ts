import { Injectable, ViewContainerRef, signal } from '@angular/core';
import { Modal } from '../types/modal.class';

export interface ModalInput {
  name: string;
  value: unknown;
};

@Injectable({ providedIn: 'root' })
export class ModalService {
  private containerRef: ViewContainerRef;
  readonly isClosed = signal(true);

  setContainerRef(containerRef: ViewContainerRef): void {
    this.containerRef = containerRef;
  }

  open(modal: typeof Modal, inputs?: ModalInput[]): void {
    this.containerRef.clear();
    const component = this.containerRef.createComponent(modal);
    if (inputs) {
      inputs.forEach(input => component.setInput(input.name, input.value));
    }
    this.isClosed.set(false);
  }

  close(): void {
    setTimeout(() => {
      this.containerRef.remove();
    }, 300);
    this.isClosed.set(true);
  }  
}
