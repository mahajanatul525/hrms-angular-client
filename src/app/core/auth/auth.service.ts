import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http" 
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {OAUTH2_ACCESS_TOKEN_URI, OAUTH2_CLIENT_ID, OAUTH2_CLIENT_SECRET, SERVER_API_URL} from "../../app.constants";
import {User} from "../user/model/user";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient)
  {
    this.currentUserSubject=new BehaviorSubject<User>( JSON.parse( localStorage.getItem( 'currentUser' ) ) );
    this.currentUser=this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User
  {
    return this.currentUserSubject.value;
  }

  redirectUrl: string;
  public currentUser: Observable<User>;
  public currentUserSubject: BehaviorSubject<User>;
  public EMPTY = "";

  static isUserLoggedIn(): boolean
  {
    return localStorage.getItem( 'isLoggedIn' )==='true';
  }
  
  oauthLogin(username: string, password: string)
  {
    const httpOptions={
      headers: new HttpHeaders(
        {
          "Content-Type": "application/x-www-form-urlencoded",
          authorization: 'Basic '+btoa( OAUTH2_CLIENT_ID+':'+OAUTH2_CLIENT_SECRET )
        })
    };

    const body = new HttpParams()
      .set("grant_type", "password")
      .set('username', username)
      .set('password', password)
      .set("client_id", "mobile");

    return this.httpClient.post<any>(OAUTH2_ACCESS_TOKEN_URI, body.toString(), httpOptions).pipe(catchError(this.errorHandler));
  }

  getUserInfoUsingOAuth2Token(accessToken: any)
  {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          "Content-Type": "application/x-www-form-urlencoded",
          authorization: "Bearer " + accessToken
        })
    };
    return this.httpClient.get<any>(SERVER_API_URL + "services/user-info", httpOptions)
               .pipe(map(user =>
               {
                 if (user)
                 {
                   localStorage.setItem("currentUser", JSON.stringify(user));
                   localStorage.setItem("isLoggedIn", "true");
                   this.currentUserSubject.next(user);
                 }
                 return user;
               }));
  }

  logout()
  {
    localStorage.setItem("access_token", null);
    localStorage.setItem("refresh_token", null);
    localStorage.setItem("token_type", null);
    localStorage.setItem("scope", null);

    localStorage.removeItem( 'currentUser' );
    this.currentUserSubject.next( null );
    localStorage.setItem( 'isLoggedIn', 'false' );
  }


  errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.message}`);    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}


