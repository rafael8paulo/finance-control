export enum TransactionType {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE',
}

export interface Transaction {
    id: number;
    userId: number;
    description: string;
    value: number;
    type: TransactionType;
    date: Date;
}

export interface TransactionForm {
    description: string;
    value: string;
    type: TransactionType;
    date: Date;
}

export interface RequestCreateTransaction {
    userId: number;
    value: number | null;
    type: TransactionType;
    date: Date;
    description: string;
}