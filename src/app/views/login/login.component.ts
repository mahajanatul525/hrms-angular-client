import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "../../core/auth/auth.service";
import { AlertService } from '../alert';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  message: string;
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  loginFailed: boolean;

  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    protected alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    //Logout user if already logged in
    this.logout();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  oauth2Login() {

    this.submitted = true;

    if (!this.loginForm.valid)
      return;

    this.loginFailed = false;
    this.spinner.show();
    this.authService.oauthLogin(this.f.username.value, this.f.password.value).subscribe(
      response => {
        console.log(JSON.stringify(response));
        if (response["access_token"]) {
          this.router.navigate(['/dashboard']);

          //login successful if there's a Spring Session token in the response
          if (response && response["access_token"]) {
            //store user details and Spring Session OAuth token refreshes
            localStorage.setItem("access_token", response["access_token"]);
            localStorage.setItem("refresh_token", response["access_token"]);
            localStorage.setItem("token_type", response["token_type"]);
            localStorage.setItem("scope", response["scope"]);
            localStorage.setItem("isLoggedIn", "true");

            this.getUserInfoUsingOAuth2Token(response["access_token"]);
          }
        }
        else {
          this.router.navigate(['/login']);
        }
      },
      error => {
        this.alertService.error('invalid user or password', this.options);
        this.loginFailed = true;
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      });
  }

  public logout() {
    this.authService.logout();
    this.setMessage();
  }

  isUserLoggedIn() {

  }

  private setMessage() {
    this.message = 'Logged ' + (AuthService.isUserLoggedIn() ? 'in' : 'out');
  }

  private getUserInfoUsingOAuth2Token(accessToken) {
    this.authService.getUserInfoUsingOAuth2Token(accessToken).subscribe(
      userObject => {
        this.router.navigate(["/dashboard"]);
        console.log("userObject" + userObject);
      },
      error => {
        localStorage.removeItem("currentUser");
        this.router.navigate(["/login"]);
        console.log("Error occurred while fetching user info");
      }
    );
  }
}

