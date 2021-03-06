import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {tap} from 'rxjs/operators';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(request, next) {
    const authService: AuthService = this.injector.get(AuthService);
    const tokenizeRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    });
    return next.handle(tokenizeRequest);
  }
}
