import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Transaction, TransactionForm, RequestCreateTransaction } from '../models/transaction-type';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { NumberUtils } from '../utils/number.utils';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    private readonly apiUrl = `${environment.apiUrl}/transactions`;

    constructor(
        private http: HttpClient,
        private router: Router,
        private toastService: ToastService,
        private numberUtils: NumberUtils
    ) { }

    getTransactionsByUserAndMonthAndYear(month: number, year: number): Observable<Transaction[]> {
        return this.http.get<Transaction[]>(`${this.apiUrl}/${month}/${year}`);
    }

    createTransaction(transaction: TransactionForm) {
        const requestCreateTransaction: RequestCreateTransaction = {
            userId: 1,
            value: this.numberUtils.currencyToNumber(transaction.value),
            type: transaction.type,
            date: transaction.date,
            description: transaction.description
        };
        this.http.post<Transaction>(this.apiUrl, requestCreateTransaction).subscribe({
            next: (response) => {
                console.log('Transação criada com sucesso:', response);
                this.toastService.showSuccess('Transação cadastrada com sucesso!');
                this.router.navigate(['/dashboard']);
            },
            error: (error) => {
                this.toastService.showError('Erro ao cadastrar transação!' + error);
                console.error('Erro ao criar transação:', error);
            },
            complete: () => {
                console.log('Requisição concluída');
            }
        });
    }

    getTransactionById(id: number): Observable<Transaction> {
        return this.http.get<Transaction>(`${this.apiUrl}/${id}`);
    }

    updateTransaction(transactionId: number, transaction: TransactionForm) {
        const requestUpdateTransaction: RequestCreateTransaction = {
            userId: 1,
            value: this.numberUtils.currencyToNumber(transaction.value),
            type: transaction.type,
            date: transaction.date,
            description: transaction.description
        };
        this.http.put<Transaction>(`${this.apiUrl}/${transactionId}`, requestUpdateTransaction).subscribe({
            next: (response) => {
                console.log('Transação atualizada com sucesso:', response);
                this.toastService.showSuccess('Transação atualizada com sucesso!');
                this.router.navigate(['/dashboard']);
            },
            error: (error) => {
                this.toastService.showError('Erro ao atualizar transação!' + error);
                console.error('Erro ao atualizar transação:', error);
            },
            complete: () => {
                console.log('Requisição concluída');
            }
        });
    }

    deleteTransaction(transactionId: number) {
        if (confirm('Tem certeza que deseja excluir essa transação?')) {
            this.http.delete<Transaction>(`${this.apiUrl}/${transactionId}`).subscribe({
                next: (response) => {
                    console.log('Transação excluida com sucesso:', response);
                    this.toastService.showSuccess('Transação excluida com sucesso!');
                    this.router.navigate(['/dashboard']);
                },
                error: (error) => {
                    this.toastService.showError('Erro ao excluir transação!' + error);
                    console.error('Erro ao excluir transação:', error);
                },
                complete: () => {
                    console.log('Requisição concluída');
                }
            });
        }

    }

} 