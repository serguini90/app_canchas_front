import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PreferencesService } from '../infraestructure/preferences.service';

@Injectable({
  providedIn: 'root',
})
export class ApiInterceptor implements HttpInterceptor {
  public static token: string | null;
  constructor(private preferenceService: PreferencesService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if (request.url.indexOf('api/usuario') > -1) return next.handle(request);
    
    if (ApiInterceptor.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${ApiInterceptor.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
