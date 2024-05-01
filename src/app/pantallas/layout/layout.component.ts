import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from 'app/shared/components/footer/footer.component';
import { SidebarComponent } from 'app/shared/components/sidebar/sidebar.component';
import { ToolbarComponent } from 'app/shared/components/toolbar/toolbar.component';
import { environment } from 'environments/environment.development';

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
