import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  constructor(private sideBarService: SideBarService) {}
  
  toggleDrawer(): void {
    console.log('toogle en toolbar')
    this.sideBarService.toggleDrawer();
  }
  
}
