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
    password: ''
  };
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  registerUser() {
    console.log(this.registerUserData);
    this.authService.registerUser(this.registerUserData).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/invoice-add']);
        localStorage.setItem('token', response.token);
      },
      error => console.log(error)
    );
  }
}
