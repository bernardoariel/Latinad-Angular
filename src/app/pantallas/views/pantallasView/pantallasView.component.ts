import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DisplayService } from 'app/services/display.service';
import { MyTableComponent } from 'app/shared/components/MyTable/MyTable.component';
import { delayWhen, timer } from 'rxjs';


@Component({
  selector: 'app-pantallas-view',
  standalone: true,
  imports: [CommonModule, MyTableComponent],
  templateUrl: './pantallasView.component.html',
  styleUrl: './pantallasView.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PantallasViewComponent {
  private displayService = inject(DisplayService);
  private router = inject(Router)
  isLoading: boolean = true;
  displays: any[] = [];
  constructor(private cdr: ChangeDetectorRef) {
    this.loadDisplays();
  }

  loadDisplays(): void {
    this.displayService
      .getDisplayList(2, 1)
      .pipe(
        delayWhen(() => timer(1000)) // Espera 1000 ms antes de emitir los resultados
      )
      .subscribe({
        next: (data) => {
          this.displays = data.data;
          this.isLoading = false; // Finalizar carga
          this.cdr.markForCheck();
          console.log('Displays:', data.data);
        },
        error: (error) => {
          console.error('Error fetching displays:', error);
        },
      });
  }
  agregarDisplay(){
    this.router.navigateByUrl('/dashboard/pantalla');
  }
}
