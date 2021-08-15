import { SpinnerService } from './../spinner/spinner.service';
import { LoaderService } from './../services/loader.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private spinnerService:SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.requestStarted()
    return this.handler(next, req)
  }
  handler(next: HttpHandler, req: HttpRequest<any>){
    return next.handle(req)
      .pipe(
          tap(
              (event) => {
                if(event instanceof HttpResponse){
                  this.spinnerService.requestEnded()
                  // console.log("vita ilay interception !!!")
                }
              },
              (error: HttpErrorResponse) => {
                throw error;
              }
          ),
      );
  }

}
