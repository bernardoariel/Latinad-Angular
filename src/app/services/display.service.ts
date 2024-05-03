import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { generateRandomNumber, getDescriptionFake, getNamesFake } from 'app/helpers/getUtilsFake';
import { environment } from 'environments/environment.development';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DisplayService {
  private readonly baseUrl: string = environment.backendApi;
  private displaysSubject = new BehaviorSubject<any[]>([]);
  public displays$ = this.displaysSubject.asObservable();

  private router = inject(Router);
  private http = inject(HttpClient);
  constructor() {}

  getDisplayList(
    pageSize: number,
    offset: number,
    name?: string,
    type?: string
  ): Observable<{ data: any[]; totalCount: number }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    });

    let params = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('offset', offset.toString());

    if (name) {
      params = params.append('name', name);
    }
    if (type) {
      params = params.append('type', type);
    }
    console.log('params::: ', params);

    return this.http
      .get<{ data: any[]; totalCount: number }>(`${this.baseUrl}/display`, {
        headers,
        params,
      })
      .pipe(
        tap((response) => {
          this.displaysSubject.next(response.data);
        }),
        catchError((error) => {
          console.error('Error fetching displays:', error);
          return throwError(
            () => new Error('Error fetching displays: ' + error.message)
          );
        })
      );
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

  createMultipleDisplay(count: number): void {
    for (let i = 0; i < count; i++) {
      const objFake = {
        name: getNamesFake(),
        description: getDescriptionFake(),
        price_per_day: generateRandomNumber(3),
        resolution_height: generateRandomNumber(2),
        resolution_width: generateRandomNumber(2),
        type: Math.random() < 0.5 ? 'indoor' : 'outdoor',
      };
      this.createDisplay(objFake).subscribe({
        next: (response) => {
          console.log(
            `Display ${objFake.name ? 'actualizado' : 'creado'} con éxito`,
            response
          );
          this.updateDisplaysList(response);
        },
        error: (error) => {
          console.error(
            `Error al ${objFake.name ? 'actualizar' : 'crear'} display`,
            error
          );
        },
      });
    }
  }
  updateDisplay(id: number, displayData: any): Observable<any> {
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
  deleteDisplay(id: number) {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('Auth token not found');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/display/${id}`, { headers });
  }
  private updateDisplaysList(newDisplay: any) {
    const currentDisplays = this.displaysSubject.value;
    this.displaysSubject.next([...currentDisplays, newDisplay]);
  }
}
