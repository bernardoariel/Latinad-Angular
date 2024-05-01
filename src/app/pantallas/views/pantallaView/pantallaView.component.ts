import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pantalla-view',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './pantallaView.component.html',
  styleUrl: './pantallaView.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PantallaViewComponent { }
