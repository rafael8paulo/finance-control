import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Transaction } from '../../models/transaction-type';

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [NgClass, DatePipe, CommonModule],
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss']
})
export class TransactionCardComponent {
  @Input() transaction!: Transaction;
}
