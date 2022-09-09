import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get auth token
    const authToken = this.authService.authToken;

    // Check if the auth token exists and request url is not third-party api
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Check if error status is 403 or 401
        // Applicable only for non-thirdparty API
        if (error.status === 403 || error.status === 401) {
          this.authService.removeAuthToken();
          this.router.navigate(['/']);
        }

        // Return an error once interceptor catch an error
        return throwError(() => new Error());
      })
    );
  }
}
