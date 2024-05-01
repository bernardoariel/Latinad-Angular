import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment.development';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DisplayService {
  private readonly baseUrl: string = environment.backendApi;
  private router = inject(Router);
  private http = inject(HttpClient);
  constructor() {}

  getDisplayList(
    pageSize: number,
    offset: number,
    name?: string,
    type?: string
  ): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('Auth token not found');

    let params = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('offset', offset.toString());

    if (name) params = params.append('name', name);
    if (type) params = params.append('type', type);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.baseUrl}/display`, { headers, params });
  }
  getDisplayById() {}
  createDisplay(displayData: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('Auth token not found');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = {
      name: displayData.nombre,
      description: displayData.descripcion,
      price_per_day: parseInt(displayData.precio),
      resolution_height: parseInt(displayData.resolucionH),
      resolution_width: parseInt(displayData.resolucionW),
      type: displayData.tipoPantalla,
    };

    return this.http.post<any>(`${this.baseUrl}/display`, body, { headers });
  }
  updateDisplay() {}
  deleteDisplay() {}
}
