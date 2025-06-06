import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TransactionService } from '../../services/transaction.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { TransactionListComponent } from '../../components/transaction-list/transaction-list.component';
import { Transaction } from '../../models/transaction-type';
import { TransactionFilterComponent } from '../../components/transaction-filter/transaction-filter.component';
import { FinanceSummaryComponent } from '../../components/finance-summary/finance-summary.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatGridListModule,
    TransactionListComponent,
    TransactionFilterComponent,
    FinanceSummaryComponent
  ],
})
export class DashboardComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(
    private transactionService: TransactionService, 
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTransactionsByUserAndMonthAndYear(new Date().getMonth() + 1, new Date().getFullYear());
  }

  getTransactionsByUserAndMonthAndYear(month: number, year: number) {
    this.transactionService.getTransactionsByUserAndMonthAndYear(month, year).subscribe(transactions => {
      this.transactions = transactions;
    });
  }

  handleSearch(filter: { month: number, year: number }) {
    this.getTransactionsByUserAndMonthAndYear(filter.month, filter.year);
  }

  onNewTransaction() {
    this.router.navigate(['/transactions']);
  }

}
