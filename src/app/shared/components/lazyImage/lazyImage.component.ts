import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lazy-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lazyImage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyImageComponent implements OnInit {
  @Input()
  public url!: string;
  @Input()
  public alt: string = '';

  public hasLoaded: boolean = false;
  
  ngOnInit(): void {
    
    if (!this.url) throw new Error('Url is required');
  }

  onLoad() {
    this.hasLoaded = true;
  }
}
