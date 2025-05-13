import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../models/transaction-type';

@Component({
  selector: 'app-finance-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finance-summary.component.html',
  styleUrls: ['./finance-summary.component.scss']
})
export class FinanceSummaryComponent {
  @Input() transactions: Transaction[] = [];

  get summary() {
    const result = {
      income: 0,
      expense: 0,
      balance: 0
    };

    this.transactions.forEach(transaction => {
      if (transaction.type === 'INCOME') {
        result.income += transaction.value;
      } else {
        result.expense += transaction.value;
      }
    });

    result.balance = result.income - result.expense;

    return result;
  }
}