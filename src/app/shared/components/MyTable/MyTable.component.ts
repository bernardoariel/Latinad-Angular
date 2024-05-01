import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-my-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./MyTable.component.html`,
  styleUrl: './MyTable.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyTableComponent {
  @Input() displays: any[] = [];
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Displays updated:', this.displays);
    if (changes['displays'] && changes['displays'].currentValue) {
      console.log('Displays updated:', this.displays);
      this.cdr.markForCheck(); // Forzar la detección de cambios
    }
  }
}
