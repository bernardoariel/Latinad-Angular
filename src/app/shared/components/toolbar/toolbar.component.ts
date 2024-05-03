import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { SideBarService } from 'app/services/sideBar.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  private authService = inject(AuthService)
  constructor(private sideBarService: SideBarService) {}
  
  toggleDrawer(): void {
    
    setTimeout(() => {
      this.sideBarService.toggleDrawer();
      this.sideBarService.setIsOpen(true);
    }, 120);
    
  }
  onLogout(){
    this.authService.logout()
  }
  
}
