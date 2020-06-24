import { ContractorAddComponent } from './contractor-add/contractor-add.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ContractorService } from './contractor.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventsComponent } from './events/events.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { ContractorListComponent } from './contractor-list/contractor-list.component';
import { InvoiceAddComponent } from './invoice-add/invoice-add.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { SettingsComponent } from './settings/settings.component';
import { SettingsInvoiceItemsComponent } from './settings-invoice-items/settings-invoice-items.component';
import { SettingsInvoiceItemsAddComponent } from './settings-invoice-items-add/settings-invoice-items-add.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EventsComponent,
    InvoiceListComponent,
    ContractorListComponent,
    InvoiceAddComponent,
    ContractorAddComponent,
    ConfirmDialogComponent,
    SettingsComponent,
    SettingsInvoiceItemsComponent,
    SettingsInvoiceItemsAddComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatPaginatorModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSelectModule,
        MatListModule,
        MatCheckboxModule
    ],
  providers: [
    AuthService,
    AuthGuard,
    ContractorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ContractorAddComponent]
})
export class AppModule {}
