import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TransactionForm, TransactionType } from '../../models/transaction-type';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter
} from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    NgxMaskDirective
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
  providers: [provideNgxMask(), provideNativeDateAdapter(),
  { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
})
export class TransactionFormComponent implements OnInit {
  @Output() submitForm = new EventEmitter<TransactionForm>();
  @Input() transactionId!: number;

  transactionTypes = [
    { value: 'INCOME', label: 'Receita' },
    { value: 'EXPENSE', label: 'Despesa' }
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder, private dateAdapter: DateAdapter<Date>, private service: TransactionService) {
    this.dateAdapter.setLocale('pt-BR');
    this.form = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(100)]],
      value: [0, [Validators.required, Validators.min(0.01)]],
      type: ['EXPENSE' as TransactionType, Validators.required],
      date: [new Date(), Validators.required]
    });
  }
  ngOnInit(): void {
    if (this.transactionId !== -1 && this.transactionId !== undefined) {
      this.service.getTransactionById(this.transactionId).subscribe(transaction => {
        this.form.patchValue(transaction);
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.form.valid) {
        this.submitForm.emit(this.form.value as TransactionForm);
        this.form.reset({
          value: 0,
          type: 'EXPENSE',
          date: new Date()
        });
      }
    }
  }

  onDelete() {
    this.service.deleteTransaction(this.transactionId);
  }

}
