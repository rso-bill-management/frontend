import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerUserData = this.fb.group({
    username: ['', Validators.minLength(4)],
    password: ['', Validators.minLength(6)],
    name: ['', Validators.minLength(2)],
    surname: ['', Validators.minLength(2)],
    rules: [false, Validators.requiredTrue],
  });

  wrongCredentials = false;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }


  registerUser() {
    const formData = this.registerUserData.value;
    if(!this.registerUserData.valid){
      return;
    }
    formData.name = formData.name.charAt(0).toUpperCase() + formData.name.slice(1);
    formData.surname = formData.surname.charAt(0).toUpperCase() + formData.surname.slice(1);
    this.authService.registerUser(formData).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/invoice-add']);
          localStorage.setItem('token', response.token);
        },
        error => console.log(error)
      );
  }
}
