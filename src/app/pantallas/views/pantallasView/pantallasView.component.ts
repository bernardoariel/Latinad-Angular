import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
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
export class PantallasViewComponent implements OnInit {
  private displayService = inject(DisplayService);
  private router = inject(Router);
  isLoading: boolean = true;
  displays: any[] = [];
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;
  pageSizeOptions = [5, 10, 15, 30];
  constructor(private cdr: ChangeDetectorRef) {
    this.loadDisplays();
  }
  ngOnInit() {
    this.subscribeToDisplays();
    this.loadDisplays();
  }
  subscribeToDisplays(): void {
    this.displayService.displays$.subscribe((displays) => {
      this.displays = displays;
      this.isLoading = false;
      this.cdr.markForCheck();
    });
  }

  loadDisplays(): void {
    // Ajusta el cálculo para offset basándose en que currentPage empieza en 1
    this.displayService
      .getDisplayList(this.pageSize, (this.currentPage - 1) * this.pageSize)
      .subscribe({
        next: ({ data, totalCount }) => {
          this.displays = data;
          this.totalItems = totalCount;
          this.totalPages = Math.ceil(this.totalItems / this.pageSize);
          this.isLoading = false;
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Error fetching displays:', error);
          this.isLoading = false;
          this.cdr.markForCheck();
        },
      });
  }
  onChangePageSize(event: Event) {
    const element = event.target as HTMLSelectElement; // Aseguramiento del tipo
    const newSize = parseInt(element.value, 10);
    this.pageSize = newSize;
    this.currentPage = 1; // Reinicia a la primera página
    this.loadDisplays();
  }
  navigateToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadDisplays();
  }
  agregarDisplay() {
    this.router.navigateByUrl('/dashboard/pantalla');
  }
}
