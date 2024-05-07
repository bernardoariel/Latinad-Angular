import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
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
  public isImageLoading: boolean = true; // Nuevo indicador
  isSaving = false;
  isDisabled = false;
  public myForm!: FormGroup;

  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.myForm = this.fb.group({
      // Definición de los controles del formulario
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
        [Validators.required, Validators.pattern(/^[0-9]+$/)],
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

    // Manejo de la suscripción a los parámetros de ruta
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.id = params.get('id');
          if (this.id) {
            // Si hay id, procedemos a cargar los datos del display
            return this.displayService.getDisplayById(+this.id);
          } else {
            // Sin id, reseteamos el formulario y definimos que no hay carga pendiente
            this.isImageLoading = false;
            return EMPTY; // No hay más acciones necesarias aquí
          }
        })
      )
      .subscribe((data) => {
        if (data) {
          // Si hay datos, actualizamos el formulario y manejamos la imagen
          this.myForm.patchValue(data);
          this.imageUrl = data.picture_url; // Asegura que la URL de la imagen se maneje adecuadamente
          this.isImageLoading = false; // Terminamos la carga
        }
        this.cdr.markForCheck(); // Notificamos a Angular para la detección de cambios
      });
  }

  navigateToDisplays() {
    this.router.navigateByUrl('/dashboard/pantallas');
  }

  guardarDisplay(): void {
    if (this.myForm.valid) {
      this.isSaving = true;
      this.isDisabled = true;
      const operation = this.id
        ? this.displayService.updateDisplay(+this.id, this.myForm.value)
        : this.displayService.createDisplay(this.myForm.value);

      operation.subscribe({
        next: (response) => {
          console.log(
            `Display ${this.id ? 'actualizado' : 'creado'} con éxito`,
            response
          );
          this.isSaving = false;
          this.isDisabled = false;
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
