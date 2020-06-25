import { Component, OnInit } from '@angular/core';
import { SellerModel } from 'src/model/seller.model';
import { HttpErrorResponse } from '@angular/common/http';
import { SellerService } from '../seller.service';
import { Router } from '@angular/router';
import { DialogData } from '../register/register.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  constructor(
    private router: Router,
    private sellerService: SellerService,
    public dialog: MatDialog
  ) {
    this.sellerData = {
      tin: '',
      companyName: '',
      accountNumber: '',
      town: '',
      street: '',
      postalCode: ''
    };
  }

  sellerData: SellerModel;

  ngOnInit(): void {
    this.sellerService.getSellerData().subscribe(
      response => {
        this.sellerData = response;
      },
      error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      }
    );
  }

  onSubmitSeller() {
    this.sellerService.submitSellerData(this.sellerData).subscribe(
      response => {
        this.dialog.open(DialogData, { data: 'Success!' });
      },
      error => {}
    );
  }
}
