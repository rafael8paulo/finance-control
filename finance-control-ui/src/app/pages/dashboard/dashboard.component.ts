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
    FinanceSummaryComponent,
  ],
})
export class DashboardComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTransactionsByUserAndMonthAndYear(1, new Date().getMonth() + 1, new Date().getFullYear());
  }

  getTransactionsByUserAndMonthAndYear(userId: number, month: number, year: number) {
    this.transactionService.getTransactionsByUserAndMonthAndYear(userId, month, year).subscribe(transactions => {
      this.transactions = transactions;
    });
  }

  handleSearch(filter: { month: number, year: number }) {
    this.getTransactionsByUserAndMonthAndYear(1, filter.month, filter.year);
  }

}
