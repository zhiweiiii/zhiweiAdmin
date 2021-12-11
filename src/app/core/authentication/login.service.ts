import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Token, User,ResultVo } from './interface';
import { admin,Menu } from '@core';
import { map, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(protected http: HttpClient) {}

  login(email: string, password: string, rememberMe = false) {
    const params = new HttpParams()
    .set('username', email)
    .set('password', password);
    return this.http.get<Token | any>('/api/mall/auth/login',{params} );
  }

  refresh(params: any) {
    return this.http.post<Token | any>('/auth/refresh', params);
  }

  logout() {
    return of({});
    // return this.http.post<any>('/auth/logout', {});
  }

  me() {
    return of(admin);
    // return this.http.get<User>('/me');
  }

  menu() {
    // return this.http.get<{ menu: Menu[] }>('assets/data/menu.json?_t=' + Date.now());
    return this.http.get< ResultVo<Menu[]>>('/api/mall/menu/getUserMenu');
  }
}
