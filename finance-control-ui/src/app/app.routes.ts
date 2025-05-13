import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormTransactionComponent } from './pages/form-transaction/form-transaction.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'transactions', component: FormTransactionComponent },
    { path: 'transactions/:id', component: FormTransactionComponent },
];
