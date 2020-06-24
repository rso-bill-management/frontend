import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    rules: [false, Validators.requiredTrue]
  });

  wrongCredentials = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  registerUser() {
    const formData = this.registerUserData.value;
    if (!this.registerUserData.valid) {
      return;
    }
    formData.name =
      formData.name.charAt(0).toUpperCase() + formData.name.slice(1);
    formData.surname =
      formData.surname.charAt(0).toUpperCase() + formData.surname.slice(1);

    this.authService.registerUser(formData).subscribe(
      response => {
        this.dialog.open(DialogData, { data: 'Success!' });
        console.log(response);
      },
      error => {
        let message = '';
        if (error.error.errors === 'already_exists') {
          message = 'User already exists';
        } else {
          message = 'Something went wrong, try later.';
        }
        this.dialog.open(DialogData, { data: message });
        console.log(error);
      }
    );
  }
}

@Component({
  templateUrl: './dialogdata.html'
})
export class DialogData {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}
