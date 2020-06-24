import { Component, OnInit } from '@angular/core';
import { SellerModel } from 'src/model/seller.model';
import { HttpErrorResponse } from '@angular/common/http';
import { SellerService } from '../seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  constructor(private router: Router, private sellerService: SellerService) {
    this.sellerData = {
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
        //localStorage.setItem('token', response.headers.get('authorization'));
        // this.sellerData = response;
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

  onUpsertSeller() {
    this.sellerService
      .upsertSellerData(this.sellerData)
      .subscribe(response => {}, error => {});
  }
}
