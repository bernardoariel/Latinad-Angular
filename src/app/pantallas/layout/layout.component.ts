import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'app/shared/components/footer/footer.component';
import { SidebarComponent } from 'app/shared/components/sidebar/sidebar.component';
import { ToolbarComponent } from 'app/shared/components/toolbar/toolbar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ToolbarComponent,
    FooterComponent,
    SidebarComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
 
}
