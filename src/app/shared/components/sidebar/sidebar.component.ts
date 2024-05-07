import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
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
  private loginSubscription: Subscription;
  private router = inject(Router);
  private displayService = inject(DisplayService);
  isOpen = false;

  constructor(
    public sideBarService: SideBarService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {
    this.subscription = this.sideBarService.isOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
      this.cdr.markForCheck();
    });
    this.loginSubscription = this.authService.userLoggedIn$.subscribe(
      (loggedIn) => {
        if (loggedIn) {
          this.sideBarService.setIsOpen(false); // Cierra el sidebar al loguearse
        }
      }
    );
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
    this.loginSubscription.unsubscribe();
  }
  onSeedDisplay(): void {
    this.displayService.createMultipleDisplay(5);
  }
}
