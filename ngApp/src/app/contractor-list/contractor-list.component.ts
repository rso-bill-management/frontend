import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Contractor } from 'src/model/contractor.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContractorAddComponent } from '../contractor-add/contractor-add.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ConfirmDialog } from 'src/model/confirm-dialog.model';
import { ContractorService } from '../contractor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styleUrls: ['./contractor-list.component.css']
})
export class ContractorListComponent implements OnInit {
  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private contractorService: ContractorService
  ) {
    this.searchKey = '';
  }

  contractors: Contractor[] = [];

  displayedColumns = [
    'name',
    'taxpayerIdentificationNumber',
    'town',
    'street',
    'postalCode',
    'actions'
  ];

  listData: MatTableDataSource<any>;
  searchKey: string;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.contractorService.getContractorList().subscribe(
      response => {
        localStorage.setItem('token', response.headers.get('authorization'));

        this.contractors = response.body || [];
        this.listData = new MatTableDataSource(this.contractors);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
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

  onSearchClear(): void {
    this.searchKey = '';
    this.applyfilter();
  }

  applyfilter(): void {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onUpsertContractor(row): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = row;
    const dialogReference = this.matDialog.open(
      ContractorAddComponent,
      dialogConfig
    );
    dialogReference.afterClosed().subscribe(contractor => {
      if (contractor) {
        this.upsertContractor(contractor);
      }
    });
  }

  onRemoveContractor(contractor): void {
    const dialogConfigData: ConfirmDialog = {
      title: 'Remove Contractor',
      message: 'Are you sure to remove this Contractor?'
    };

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';
    dialogConfig.data = dialogConfigData;
    const dialogReference = this.matDialog.open(
      ConfirmDialogComponent,
      dialogConfig
    );
    dialogReference.afterClosed().subscribe(result => {
      if (result) {
        this.removeContractor(contractor);
      }
    });
  }

  upsertContractor(contractor): void {
    const index = this.contractors.findIndex(x => x.tin === contractor.tin);

    if (index === -1) {
      this.contractors.push(contractor);
    } else {
      this.contractors[index] = contractor;
    }

    this.listData.data = this.contractors;
  }

  removeContractor(contractor: Contractor): void {
    this.contractorService.removeContractor(contractor).subscribe(
      response => {
        const index = this.contractors.findIndex(x => x.tin === response.tin);
        this.contractors.splice(index, 1);
        this.listData.data = this.contractors;
      },
      error => {}
    );
  }
}
