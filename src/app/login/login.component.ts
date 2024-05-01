import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

 
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
  private authService = inject(AuthService)

  public myForm: FormGroup = this.fb.group({
    email: ['bernardockdev@gmail.com', [Validators.required, Validators.email]],
    password: ['1234', [Validators.required, Validators.minLength(4)]],
  });
  login() {
    const { email, password } = this.myForm.value;

    this.authService.login(email, password)
      .subscribe({
      next: () => console.log('se logueo'),//this.router.navigateByUrl('/dashboard'),
      error: (message) => {
       console.log('no se logueo')
      },
    });
  }
}
