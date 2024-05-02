import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, SimpleChanges, inject } from '@angular/core';
import { Router } from '@angular/router';

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
  private router=inject(Router)
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes['displays'] && changes['displays'].currentValue) {
      console.log('Displays updated:', this.displays);
      
    }
  }
  navigate(id:number){
    this.router.navigateByUrl(`/dashboard/pantalla/${id}`)
  }
}
