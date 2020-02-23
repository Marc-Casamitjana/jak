import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  openedModal = new Subject<any>();
  modalType: string;
  private modals = [];

  constructor() {}

  add(modal: any) {
    this.modals.push(modal);
  }

  remove(id: string) {
    this.modals = this.modals.filter(x => x.id !== id);
  }

  open(type: string) {
    this.openedModal.next(type);
  }

  close() {
    this.openedModal.next(false);
  }
}
