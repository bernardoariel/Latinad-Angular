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
  getDisplayById(id: number) {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('Auth token not found');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/display/${id}`, { headers });
  }
  createDisplay(displayData: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('Auth token not found');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = {
      name: displayData.name,
      description: displayData.description,
      price_per_day: parseInt(displayData.price_per_day),
      resolution_height: parseInt(displayData.resolution_height),
      resolution_width: parseInt(displayData.resolution_width),
      type: displayData.type,
    };

    return this.http.post<any>(`${this.baseUrl}/display`, body, { headers });
  }
  updateDisplay(id: number, displayData: any): Observable<any> {
    console.log('id::: ', id);
    console.log('displayData::: ', displayData);
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('Auth token not found');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = {
      name: displayData.name,
      description: displayData.description,
      price_per_day: parseInt(displayData.price_per_day),
      resolution_height: parseInt(displayData.resolution_height),
      resolution_width: parseInt(displayData.resolution_width),
      type: displayData.type,
    };
      return this.http.put<any>(`${this.baseUrl}/display/${id}`, body, {
        headers,
      });

  }
  deleteDisplay() {}
}
