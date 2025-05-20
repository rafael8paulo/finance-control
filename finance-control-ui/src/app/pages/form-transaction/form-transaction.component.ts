import { Component, OnInit } from '@angular/core';
import { TransactionFormComponent } from '../../components/transaction-form/transaction-form.component';
import { TransactionForm } from '../../models/transaction-type';
import { MatCard } from '@angular/material/card';
import { TransactionService } from '../../services/transaction.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-transaction',
  imports: [TransactionFormComponent, MatCard],
  templateUrl: './form-transaction.component.html',
  styleUrl: './form-transaction.component.scss'
})
export class FormTransactionComponent implements OnInit {

  transactionId: number = -1;
  constructor(private service: TransactionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.transactionId = params['id'];
    });
    console.log(this.transactionId);
  }

  onTransactionSubmit(transaction: TransactionForm) {
    if (this.transactionId !== undefined) {
      this.service.updateTransaction(this.transactionId, transaction);
    } else {
      this.service.createTransaction(transaction);
    }
  }
}
