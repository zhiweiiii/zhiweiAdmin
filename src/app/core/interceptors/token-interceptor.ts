import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TokenService } from '@core/authentication';
import { BASE_URL } from './base-url-interceptor';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private hasHttpScheme = (url: string) => new RegExp('^http(s)?://', 'i').test(url);

  constructor(
    private tokenService: TokenService,
    private router: Router,
    @Optional() @Inject(BASE_URL) private baseUrl?: string
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const handler = () => {
      console.log(1)
      if (request.url.includes('/auth/logout')) {
        this.router.navigateByUrl('/auth/login');
      }

      if (this.router.url.includes('/auth/login')) {
        this.router.navigateByUrl('/dashboard');
      }
    };
    console.log(2)
    if (this.tokenService.valid() && this.shouldAppendToken(request.url)) {
      return next
        .handle(
          request.clone({
            headers: request.headers.append('Authorization', this.tokenService.getBearerToken()),
            withCredentials: true,
          })
        )
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(4)
            if (error.status === 401) {
              this.tokenService.clear();
            }
            return throwError(error);
          }),
          tap(() => handler())
        );
    }
    console.log(3)
    return next.handle(request).pipe(tap(() => handler()));
  }

  private shouldAppendToken(url: string) {
    return !this.hasHttpScheme(url) || this.includeBaseUrl(url);
  }

  private includeBaseUrl(url: string) {
    if (!this.baseUrl) {
      return false;
    }

    const baseUrl = this.baseUrl.replace(/\/$/, '');

    return new RegExp(`^${baseUrl}`, 'i').test(url);
  }
}
