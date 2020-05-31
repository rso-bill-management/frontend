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

@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styleUrls: ['./contractor-list.component.css']
})
export class ContractorListComponent implements OnInit {
  constructor(
    private matDialog: MatDialog,
    private contractorService: ContractorService
  ) {}

  contractors: Contractor[] = [
    {
      id: '1',
      name: 'Piotr',
      taxpayerIdentificationNumber: '123213123123',
      town: 'Karkow',
      street: 'warynskiego 12',
      postalCode: '00-631'
    },
    {
      id: '2',
      name: 'Tomek',
      taxpayerIdentificationNumber: '123213123123',
      town: 'Warszawa',
      street: 'warynskiego 12',
      postalCode: '00-631'
    },
    {
      id: '3',
      name: 'Daniel',
      taxpayerIdentificationNumber: '123213123123',
      town: 'Warszawa',
      street: 'warynskiego 12',
      postalCode: '00-631'
    },
    {
      id: '4',
      name: 'Marek',
      taxpayerIdentificationNumber: '123213123123',
      town: 'Warszawa',
      street: 'warynskiego 12',
      postalCode: '00-631'
    },
    {
      id: '5',
      name: 'Arek',
      taxpayerIdentificationNumber: '123213123123',
      town: 'Warszawa',
      street: 'warynskiego 12',
      postalCode: '00-631'
    },
    {
      id: '6',
      name: 'Jarek',
      taxpayerIdentificationNumber: '123213123123',
      town: 'Warszawa',
      street: 'warynskiego 12',
      postalCode: '00-631'
    },
    {
      id: '7',
      name: 'Jacek',
      taxpayerIdentificationNumber: '123213123123',
      town: 'Warszawa',
      street: 'warynskiego 12',
      postalCode: '00-631'
    }
  ];

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
    this.searchKey = '';
    this.listData = new MatTableDataSource(this.contractors);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
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
    const index = this.contractors.findIndex(x => x.id === contractor.id);

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
        const index = this.contractors.findIndex(x => x.id === response.id);
        this.contractors.splice(index, 1);
        this.listData.data = this.contractors;
      },
      error => {}
    );
  }
}
