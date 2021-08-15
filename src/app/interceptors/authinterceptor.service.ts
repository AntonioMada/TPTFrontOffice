import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthinterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Interception In Progress");
    const token: string = localStorage.getItem('access_token');
    req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    return next.handle(req)
        .pipe(
           catchError((error: HttpErrorResponse) => {

                if (error && error.status === 401) {
                    console.log("ERROR 401 UNAUTHORIZED");
                    this.authService.logout();
                    this.router.navigate(['login']);
                }
                const err = error.error.message || error.statusText;
                return throwError(error);
           })
        );
  }

}