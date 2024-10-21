import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const toExclude="/login";
    if(request.url.search(toExclude)==-1) {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        const cloned = request.clone({
          headers: request.headers.set('Authorization', jwt),
        });
        return next.handle(cloned);
      }
    }
    return next.handle(request);
  }
}
