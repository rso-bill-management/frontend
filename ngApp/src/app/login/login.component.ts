import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  loginUserData = {
    username: '',
    password: ''
  };

  wrongCredentials: boolean = false;

  ngOnInit(): void {}

  loginUser(): void {
    this.authService
      .loginUser(this.loginUserData)
      .subscribe(
        response => this.loginSuccess(response),
        error => this.loginFailure(error)
      );
  }

  loginSuccess(response): void {
    this.router.navigate(['/invoice-add']);
    localStorage.setItem('token', response.token);
  }

  loginFailure(error): void {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 400) {
        this.wrongCredentials = true;
      }
    }
  }
}
