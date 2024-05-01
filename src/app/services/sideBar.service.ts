import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SideBarService {
  private isOpen = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpen.asObservable();
  toggleDrawer(): void {
    this.isOpen.next(!this.isOpen.value);
  }
  setIsOpen(open: boolean): void {
    this.isOpen.next(open);
  }
}
