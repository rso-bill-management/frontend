import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contractor } from 'src/model/contractor.model';
import { ContractorService } from '../contractor.service';

@Component({
  selector: 'app-contractor-add',
  templateUrl: './contractor-add.component.html',
  styleUrls: ['./contractor-add.component.css']
})
export class ContractorAddComponent implements OnInit {
  constructor(
    private contractorService: ContractorService,
    public dialogRef: MatDialogRef<ContractorAddComponent>,
    @Inject(MAT_DIALOG_DATA) public contractorData: Contractor
  ) {
    this.contractor = {
      id: '',
      name: '',
      taxpayerIdentificationNumber: '',
      town: '',
      street: '',
      postalCode: ''
    };
  }

  contractor: Contractor;

  ngOnInit(): void {
    if (this.contractorData) {
      this.contractor = {
        id: this.contractorData.id,
        name: this.contractorData.name,
        taxpayerIdentificationNumber: this.contractorData
          .taxpayerIdentificationNumber,
        town: this.contractorData.town,
        street: this.contractorData.street,
        postalCode: this.contractorData.postalCode
      };
    }
  }

  onSubmit(): void {
    this.contractorService
      .upsertContractor(this.contractor)
      .subscribe(
        response => this.submitSuccess(response),
        error => this.submitError(error)
      );
  }

  submitSuccess(response): void {
    this.onClose(response);
  }

  submitError(error): void {}

  onClose(results): void {
    this.dialogRef.close(results);
  }
}
