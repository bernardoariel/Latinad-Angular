import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, SimpleChanges, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DisplayService } from 'app/services/display.service';

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
  private router = inject(Router);
  private displayService = inject(DisplayService);
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['displays'] && changes['displays'].currentValue) {
      console.log('Displays updated!!!:', this.displays);
    }
  }
  navigate(id: number) {
    this.router.navigateByUrl(`/dashboard/pantalla/${id}`);
  }
  onDeleteDisplay(id: number) {
    this.displayService.deleteDisplay(id).subscribe({
      next: (response) => {
        console.log('Display eliminado con éxito', response);
        // Remove the deleted display from the array
        this.removeDisplayFromList(id);
        this.cdr.markForCheck(); // Since we are using OnPush, we need to manually mark for check
      },
      error: (error) => {
        console.error('Error al eliminar display', error);
      },
    });
  }
  private removeDisplayFromList(id: number) {
    this.displays = this.displays.filter((display) => display.id !== id);
  }
}
