import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // const token = localStorage.getItem('token');
    // If not a request with a header with Flag = "Ignore" handle normally
    if (request.headers.get('Ignore') !== 'true') {
      const token = 'awodnfsjnf';
      if (token) {
        return next.handle(this.injectToken(request));
      }
    }
    // If a request with a header ignore don't handle the request and delete the Flag = "Ignore"
    const newHeader = request.headers.delete('Ignore');
    const newRequest = request.clone({ headers: newHeader });
    return next.handle(newRequest);
  }

  injectToken(request: HttpRequest<any>) {
    // const token = localStorage.getItem('token');
    const token = 'awodnfsjnf';
    console.log('This is the token', token);
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        Ip: this.authService.ip,
      },
    });
  }
}
