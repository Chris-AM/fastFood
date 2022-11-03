import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment.electron';
import { registerInterface } from './register/register.interface';
import { LoginInterface } from './login/login.interface';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: User;

  constructor(private httpClient: HttpClient, private router: Router) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uuid(): string {
    return this.user.id || '';
  }

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
    return this.httpClient.post(`${base_url}/auth/login`, formData).pipe(
      tap({
        next: (resp: any) => localStorage.setItem('token', resp.token),
        error: (err) => console.log('tap error', err),
      })
    );
  }

  validateToken(): Observable<boolean> {
    const token = this.token;
    return this.httpClient
      .get(`${base_url}/auth/refresh`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        map((resp: any) => {
          const {
            name,
            email,
            adress,
            phoneNumber,
            password,
            id,
            role,
            phoneCode,
            google,
            facebook,
            avatar,
          } = resp.user;
          this.user = new User(
            name,
            email,
            adress,
            phoneNumber,
            '',
            id,
            role,
            phoneCode,
            google,
            facebook,
            avatar
          );
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError((error) => of(false))
      );
  }

  updateProfile(data: {
    name?: string;
    email?: string;
    phoneNumber?: number;
    password?: string;
    confirmPassword?: string;
    adress?: string;
    role?: string;
  }) {
    data = { ...data, role: this.user.role[0] };
    const token = this.token;
    return this.httpClient.put(`${base_url}/user/${this.uuid}`, data, {
      headers: {
        'x-token': token,
      },
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
