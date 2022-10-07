import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of,  } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment.electron';
import { registerInterface } from './register/register.interface';
import { LoginInterface } from './login/login.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  createUser(formData: registerInterface) {
    return this.httpClient
      .post(`${base_url}/auth/maintainer/register`, formData)
      .pipe(
        tap({
          next: (resp: any) => localStorage.setItem('token', resp.token),
          error: (err) => console.log('tap error', err),
        })
      );
  }

  login(formData: LoginInterface) {
    return this.httpClient
      .post(`${base_url}/auth/login`, formData)
      .pipe(
        tap({
          next: (resp: any) => localStorage.setItem('token', resp.token),
          error: (err) => console.log('tap error', err),
        })
      );
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.httpClient
      .get(`${base_url}/auth/refresh`, {
        headers: {
          'x-token': token
        }
    }).pipe(
      tap({
        next: (resp:any) => localStorage.setItem('token', resp.token)
      }),
      map(resp => true),
      catchError(error => of(false)),
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
