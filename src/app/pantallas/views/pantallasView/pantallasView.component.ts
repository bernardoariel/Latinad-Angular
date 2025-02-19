import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DisplayType } from 'app/interfaces/typeDisplays.interface';
import { DisplayService } from 'app/services/display.service';
import { MyTableComponent } from 'app/shared/components/MyTable/MyTable.component';




@Component({
  selector: 'app-pantallas-view',
  standalone: true,
  imports: [CommonModule, FormsModule, MyTableComponent],
  templateUrl: './pantallasView.component.html',
  styleUrl: './pantallasView.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PantallasViewComponent implements OnInit {
  public DisplayType = DisplayType;
  private displayService = inject(DisplayService);
  private router = inject(Router);
  isLoading: boolean = true;
  displays: any[] = [];
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;
  pageSizeOptions = [5, 10, 15, 30];
  selectedType: DisplayType = DisplayType.All;
  searchQuery: string = '';
  dialogOpen: boolean = false;
  currentIdToDelete: number | null = null;
  seeToast: boolean = false;
  nameItemByDelete= ''
  isDisabled = false
  constructor(private cdr: ChangeDetectorRef) {
    this.loadDisplays();
  }
  ngOnInit() {
    this.subscribeToDisplays();
    this.loadDisplays();
  }
  handleRequestDelete(display: any) {
    this.currentIdToDelete = display.id;
    this.nameItemByDelete = display.name
    this.dialogOpen = true;
  }
  confirmDelete() {
     this.isDisabled = true; 
    if (this.currentIdToDelete != null) {
      this.displayService.deleteDisplay(this.currentIdToDelete).subscribe({
        next: (response) => {
          this.dialogOpen = false;
          this.seeToast = true;
          setTimeout(() => {
            this.seeToast = false;
             this.isDisabled = false; 
            this.cdr.detectChanges();
          }, 2000);
          this.cdr.detectChanges();
          this.loadDisplays();
        },
        error: (error) => {
          console.error('Error al eliminar display', error);
        },
      });
    }
  }

  cancelDelete() {
    this.dialogOpen = false; 
  }
  onChangeType(type: DisplayType) {
    this.selectedType = type;
    this.currentPage = 1; 
    this.loadDisplays();
  }
  subscribeToDisplays(): void {
    this.displayService.displays$.subscribe((displays) => {
      this.displays = displays;
      this.isLoading = false;
      this.cdr.markForCheck();
    });
  }

  loadDisplays(searchName?: string): void {
    if (!searchName) this.searchQuery = '';
    this.isLoading = true;
    const typeFilter =
      this.selectedType === DisplayType.All ? undefined : this.selectedType;

    this.displayService
      .getDisplayList(
        this.pageSize,
        (this.currentPage - 1) * this.pageSize,
        searchName,
        typeFilter
      )
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
  handleKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'Enter') {
      this.loadDisplays(this.searchQuery);

      this.searchQuery = '';
    }
  }
  onChangePageSize(event: Event) {
    const element = event.target as HTMLSelectElement; 
    const newSize = parseInt(element.value, 10);
    this.pageSize = newSize;
    this.currentPage = 1;
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
  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize - 1, this.totalItems);
  }
  resetSearch() {
    this.searchQuery = '';
    this.loadDisplays();
  }
}
