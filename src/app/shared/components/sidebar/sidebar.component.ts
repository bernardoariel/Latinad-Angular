import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DisplayService } from 'app/services/display.service';
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
  private subscription: Subscription;
  private router = inject(Router);
  private displayService = inject(DisplayService);
  isOpen = false;

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
    this.isOpen = (event.target as HTMLInputElement).checked;
  }
  navigate(url: string) {
    this.router.navigateByUrl(url).then(() => {
      this.sideBarService.setIsOpen(false);
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onSeedDisplay():void{
    this.displayService.createMultipleDisplay(5)
  }
}
