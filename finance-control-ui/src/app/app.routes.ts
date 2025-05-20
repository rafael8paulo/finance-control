import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormTransactionComponent } from './pages/form-transaction/form-transaction.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './security/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard] // Protege a rota se necessário
    },
    {
        path: 'transactions',
        component: FormTransactionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'transactions/:id',
        component: FormTransactionComponent,
        canActivate: [AuthGuard]
    },
    // Rota para página não encontrada (opcional)
    {
        path: '**',
        redirectTo: 'login' // ou componente específico para 404
    }
];
