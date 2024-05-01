import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { DisplayService } from 'app/services/display.service';


@Component({
  selector: 'app-pantalla-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pantallaView.component.html',
  styleUrl: './pantallaView.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PantallaViewComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private displayService = inject(DisplayService);

  public myForm: FormGroup = this.fb.group({
    nombre: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    descripcion: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(500)],
    ],
    precio: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    resolucionH: [
      '',
      [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(1)],
    ],
    resolucionW: [
      '',
      [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(1)],
    ],
    tipoPantalla: ['', [Validators.required]],
  });

  guardarDisplay() {
    if (this.myForm.valid) {
      this.displayService.createDisplay(this.myForm.value).subscribe({
        next: (response) => console.log('Display creado con éxito', response),
        error: (error) => console.error('Error al crear display', error),
      });
    } else {
      console.error('El formulario no es válido');
    }
  }
}
