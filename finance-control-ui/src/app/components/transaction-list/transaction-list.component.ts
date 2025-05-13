import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { TransactionCardComponent } from '../transaction-card/transaction-card.component';
import { Transaction } from '../../models/transaction-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [NgFor, TransactionCardComponent, NgIf],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnChanges {
  @Input() transactions: Transaction[] = [];

  filteredTransactions: Transaction[] = [];
  currentFilter: { month: number, year: number } | null = null;

  constructor(private router: Router) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['transactions'] || changes['currentFilter']) {
      this.applyFilter();
    }
  }

  onFilterChange(filter: { month: number, year: number }) {
    // Criando um novo objeto para forçar a detecção de mudanças
    this.currentFilter = { ...filter };
    this.applyFilter();
  }

  private applyFilter() {
    if (!this.currentFilter) {
      // Criando um novo array para forçar a detecção de mudanças
      this.filteredTransactions = [...this.transactions];
      return;
    }

    // Criando um novo array filtrado
    this.filteredTransactions = this.transactions
      .filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate.getMonth() + 1 === this.currentFilter!.month &&
          transactionDate.getFullYear() === this.currentFilter!.year
        );
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  trackById(index: number, transaction: Transaction): number {
    return transaction.id; // Ou qualquer propriedade única
  }

  onTransactionClick(transaction: Transaction) {
    this.router.navigate([`/transactions/${transaction.id}`]);
  }

}