import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse, User } from 'app/interfaces';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.backendApi;
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
      // return true;
      this.checkAuth()
    }
    return false;
  }

  checkAuth(): Observable<boolean> {
    const token = localStorage.getItem('authToken');
    const url = this.baseUrl + '/display?name=grande&pageSize=10&type=indoor';
    // if (!token) return of(false)
      
  
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
