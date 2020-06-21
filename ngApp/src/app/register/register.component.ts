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
    checkbox: false
  };

  wrongCredentials = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  validateData() {
    if (
      this.registerUserData.username === '' ||
      this.registerUserData.password === '' ||
      this.registerUserData.checkbox === false
    ) {
      return false;
    }
    return true;
  }

  registerUser() {
    if (this.validateData()) {
      console.log(this.registerUserData);
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
