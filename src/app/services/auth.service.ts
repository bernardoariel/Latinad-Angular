import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse, User } from 'app/interfaces';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.backendApi;
  private router = inject(Router);
  private http = inject(HttpClient);
  constructor() {}

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      tap((response) =>
        console.log({ email: response.email, token: response.token })
      ),
      map(({ email, token }) => this.setAuthentication(email, token)),
      catchError((err) => throwError(() => new Error(err.error.message)))
    );
  }

  private setAuthentication(email: string, token: string): boolean {
    if (token) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('userName', email);
      this.router.navigateByUrl('/dashboard');
      this.checkAuth();
      return true;
    }
    return false;
  }
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    this.router.navigateByUrl('/login');
  }
  checkAuth(): Observable<boolean> {
    const token = localStorage.getItem('authToken');
    const url = this.baseUrl + '/display?name=grande&pageSize=10&type=indoor';

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('headers::: ', headers);

    return this.http.get<any>(url, { headers }).pipe(
      tap((response) => {
        console.log('Response data:', response); // Registra los datos recibidos para depuración
      }),
      map((response) => {
        // Puedes añadir lógica adicional aquí basada en los datos de respuesta
        return true; // Asume autenticación válida si no hay errores
      }),
      catchError((err) => throwError(() => new Error(err.error.message)))
    );
  }
}
