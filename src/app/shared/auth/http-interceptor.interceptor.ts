import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { finalize, tap } from 'rxjs/operators';
import { VisualFeedbackService } from '../visual-feedback/visual-feedback.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private visualFeedbackService: VisualFeedbackService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.headers.get('Ignore') !== 'true') {
      const token = this.authService.getToken();
      if (token) {

        this.visualFeedbackService.setLoading(request.url, true);

        return next.handle(this.injectToken(request)).pipe(

          finalize(() => {

            this.visualFeedbackService.setLoading(request.url, false);
          })

        );
      }
    }
    // If a request with a header ignore don't handle the request and delete the Flag = "Ignore"
    const newHeader = request.headers.delete('Ignore');
    const newRequest = request.clone({ headers: newHeader });

    this.visualFeedbackService.setLoading(request.url, true);

    return next.handle(newRequest).pipe(

      finalize(() => {

        this.visualFeedbackService.setLoading(request.url, false);
      })

    );;
  }

  injectToken(request: HttpRequest<any>) {
    const token = this.authService.getToken();
    // console.log(token);
    return request.clone({
      setHeaders: {
        Tokenstring: token,
      },
    });
  }
}
