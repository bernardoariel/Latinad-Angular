import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-my-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./MyTable.component.html`,
  styleUrl: './MyTable.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyTableComponent {}
