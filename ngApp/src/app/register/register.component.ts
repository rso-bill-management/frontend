import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData = {
    username: '',
    password: '',
    name: '',
    surname: '',
    checkbox: false
  };

  wrongCredentials = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  validateData() {
    if (
      this.registerUserData.username === '' ||
      this.registerUserData.password === '' ||
      this.registerUserData.name === '' ||
      this.registerUserData.surname === '' ||
      this.registerUserData.checkbox === false
    ) {
      return false;
    }
    return true;
  }

  registerUser() {
    this.registerUserData.name = this.registerUserData.name.charAt(0).toUpperCase() + this.registerUserData.name.slice(1);
    this.registerUserData.surname = this.registerUserData.surname.charAt(0).toUpperCase() + this.registerUserData.surname.slice(1);
    if (this.validateData()) {
      this.authService.registerUser(this.registerUserData).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/invoice-add']);
          localStorage.setItem('token', response.token);
        },
        error => console.log(error)
      );
    } else {
      this.wrongCredentials = true;
    }
  }
}
