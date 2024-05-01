import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MyTableComponent } from 'app/shared/components/MyTable/MyTable.component';

@Component({
  selector: 'app-pantallas-view',
  standalone: true,
  imports: [
    CommonModule,
    MyTableComponent
  ],
  templateUrl: './pantallasView.component.html',
  styleUrl: './pantallasView.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PantallasViewComponent { }
