import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pantallas-view',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './pantallasView.component.html',
  styleUrl: './pantallasView.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PantallasViewComponent { }
