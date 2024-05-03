import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DisplayService } from 'app/services/display.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `.stat-figure svg {
    width: 50px;  /* Ajusta al tamaño deseado */
    height: auto; /* Mantiene la proporción */
    fill: currentColor; /* Hereda el color del texto del elemento padre */
}`,
})
export class DashboardComponent {
  public isLoading: boolean = true;
  displays: any[] = []; // Ensure this is an array
  totalItems: number = 0;
  userName: string = '';
  constructor(
    private cdr: ChangeDetectorRef,
    private displayService: DisplayService,
    private router: Router
  ) {
    this.userName = localStorage.getItem('userName') || '';
    this.loadDisplays();
  }
  loadDisplays(): void {
    this.displayService.getDisplayList(10, 0).subscribe({
      next: (data: any) => {
        this.displays = data.data;
        this.totalItems = data.totalCount;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (error: any) => {
        console.error('Error fetching displays:', error);
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }
  get outdoorCount(): number {
    return this.displays.filter((display) => display.type === 'outdoor').length;
  }
  get indoorCount(): number {
    return this.displays.filter((display) => display.type === 'indoor').length;
  }
  get totalDisplays(): number {
    return this.displays.length;
  }
  get outdoorPercentage(): number {
    if (this.totalDisplays === 0) {
      return 0; // To avoid division by zero
    }
    return (this.outdoorCount / this.totalDisplays) * 100;
  }

  get indoorPercentage(): number {
    if (this.totalDisplays === 0) {
      return 0; // To avoid division by zero
    }
    return (this.indoorCount / this.totalDisplays) * 100;
  }
  navigateToDisplay(){
     this.router.navigateByUrl('/dashboard/pantallas');
  }
}
