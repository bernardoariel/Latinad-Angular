import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideBarService } from 'app/services/sideBar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  isOpen = false;
  private subscription: Subscription;

  constructor(
    public sideBarService: SideBarService,
    private cdr: ChangeDetectorRef
  ) {
    this.subscription = this.sideBarService.isOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
      this.cdr.markForCheck();
    });
  }

  onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.sideBarService.setIsOpen(checkbox.checked);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
