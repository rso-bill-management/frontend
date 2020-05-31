import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContractorAddComponent } from '../contractor-add/contractor-add.component';
import { Contractor } from 'src/model/contractor.model';
import { ConfirmDialog } from 'src/model/confirm-dialog.model';
import { ContractorService } from '../contractor.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ContractorAddComponent>,
    @Inject(MAT_DIALOG_DATA) public confirmDialogData: ConfirmDialog,
    public contractorService: ContractorService
  ) {
    this.confirmDialogResponse = false;

    this.confirmDialogModel = {
      title: '',
      message: ''
    };
  }

  confirmDialogModel: ConfirmDialog;
  confirmDialogResponse: boolean;

  ngOnInit(): void {
    this.confirmDialogModel.message = this.confirmDialogData.message;
    this.confirmDialogModel.title = this.confirmDialogData.title;
  }

  onNoButtonClick(): void {
    this.dialogRef.close(false);
  }

  onYesButtonClick(): void {
    this.dialogRef.close(true);
  }
}
