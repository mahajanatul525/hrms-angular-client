import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Observable, EMPTY,throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";
import {
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor
{
  constructor(private authService: AuthService, private router: Router)
  {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        }

        // If you want to return a new response:
        //return of(new HttpResponse({body: [{name: "Default value..."}]}));

        // If you want to return the error on the upper level:
        return throwError(error);

        // or just return nothing:
       // return EMPTY;
      })
    );



    // return next.handle( request ).pipe( catchError( err =>
    // {

    //   if(err.status===401)
    //   {
    //     console.log('Inside ErrorInterceptor, Http Status: 401');
    //     this.authService.logout();
    //     this.router.navigate( ['/login'] );
    //   }
    //   if(err.status===403)
    //   {
    //     console.log('Inside ErrorInterceptor, Http Status: 403');
    //     this.authService.logout();
    //     this.router.navigate( ['/403'] );
    //   }

    //   if(err.status===404)
    //   {
    //     console.log('Inside ErrorInterceptor, Http Status: 404');
    //     //this.authService.logout();
    //     //this.router.navigate( ['/login'] );
    //   }
    //   if(err.status===500)
    //   {
    //     console.log('Inside ErrorInterceptor, Http Status: 500');
    //     this.authService.logout();
    //     this.router.navigate( ['/login'] );
    //   }


    //   let error=err.error.message||err.error;
    //   return throwError( error );
    // })



    
    //);
  }
}
