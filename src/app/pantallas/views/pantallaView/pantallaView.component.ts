import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DisplayService } from 'app/services/display.service';
import { LazyImageComponent } from 'app/shared/components/lazyImage/lazyImage.component';
import { EMPTY, switchMap } from 'rxjs';



@Component({
  selector: 'app-pantalla-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LazyImageComponent],
  templateUrl: './pantallaView.component.html',
  styleUrl: './pantallaView.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PantallaViewComponent implements OnInit {
  public id: null | string = null;
  public imageUrl: string = '';
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private displayService = inject(DisplayService);
  isSaving = false
  public myForm!: FormGroup;

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(500),
        ],
      ],
      price_per_day: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)],
      ],
      resolution_height: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
          Validators.min(1),
        ],
      ],
      resolution_width: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
          Validators.min(1),
        ],
      ],
      type: ['', [Validators.required]],
    });

    // Carga los datos si estamos editando un ítem existente
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.id = params.get('id');
          if (this.id) {
            return this.displayService.getDisplayById(+this.id);
          }
          return EMPTY;
        })
      )
      .subscribe((data) => {
        if (data) {
          console.log('data::: ', data);
          this.myForm.patchValue(data); // Carga los datos en el formulario
          this.imageUrl = data.picture_url;
        } else {
          this.myForm.reset(); // Asegúrate de limpiar el formulario si es un nuevo ítem
        }
      });
  }
  navigateToDisplays() {
    this.router.navigateByUrl('/dashboard/pantallas');
  }

  guardarDisplay(): void {
    if (this.myForm.valid) {
      this.isSaving=true
      const operation = this.id
        ? this.displayService.updateDisplay(+this.id, this.myForm.value)
        : this.displayService.createDisplay(this.myForm.value);

      operation.subscribe({
        next: (response) => {
          console.log(
            `Display ${this.id ? 'actualizado' : 'creado'} con éxito`,
            response
          );
          this.isSaving = false
          this.navigateToDisplays(); // Redirige al usuario después de la operación
        },
        error: (error) => {
          console.error(
            `Error al ${this.id ? 'actualizar' : 'crear'} display`,
            error
          );
        },
      });
    } else {
      console.error('El formulario no es válido');
    }
  }
}
