import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Token, User } from './interface';
import { Menu } from '@core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(protected http: HttpClient) {}

  login(email: string, password: string, rememberMe = false) {
    const params = new HttpParams()
    .set('username', email)
    .set('password', password);
    return this.http.get<Token | any>('/mall/auth/login',{params} );
  }

  refresh(params: any) {
    return this.http.post<Token | any>('/auth/refresh', params);
  }

  logout() {
    return this.http.post<any>('/auth/logout', {});
  }

  me() {
    return this.http.get<User>('/me');
  }

  menu() {
    return this.http.get<{ menu: Menu[] }>('/me/menu');
  }
}
