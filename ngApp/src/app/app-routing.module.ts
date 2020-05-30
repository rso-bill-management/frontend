import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { AddContractorComponent } from './add-contractor/add-contractor.component';
import { ContractorListComponent } from './contractor-list/contractor-list.component';
import {InvoiceListComponent} from './invoice-list/invoice-list.component';
import {InvoiceAddComponent} from './invoice-add/invoice-add.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'special',
    component: SpecialEventsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'invoice-list',
    component: InvoiceListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'invoice-add',
    component: InvoiceAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addcontractor',
    component: AddContractorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'allcontractors',
    component: ContractorListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
