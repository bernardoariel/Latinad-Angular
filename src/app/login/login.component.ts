import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { finalize } from 'rxjs';

 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private cdr: ChangeDetectorRef) {}
  public myForm: FormGroup = this.fb.group({
    email: ['bernardockdev@gmail.com', [Validators.required, Validators.email]],
    password: ['1234', [Validators.required, Validators.minLength(4)]],
  });
  login() {
    this.isLoading = true;
    const { email, password } = this.myForm.value;

    this.authService
      .login(email, password)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          console.log('se logueo');
          this.router.navigate(['/dashboard']); // Asegúrate de redirigir al usuario
        },
        error: (error) => {
          console.log('no se logueo', error.message);
          this.errorMessage = error.message || 'Ocurrió un error inesperado'; // Usar el mensaje de error
          this.cdr.markForCheck();
        },
      });
  }
  public clearErrorMessage() {
    this.errorMessage = '';
    this.cdr.markForCheck(); // Asegúrate de que los cambios se detecten dado que usas OnPush
  }
}
