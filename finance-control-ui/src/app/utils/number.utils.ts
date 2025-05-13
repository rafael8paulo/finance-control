import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NumberUtils {
    public formatNumber(value: number): string {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    public currencyToNumber(moeda: string): number | null {
        if (!moeda) return null;

        try {
            // Remove todos os caracteres não numéricos exceto vírgula
            const valorLimpo = moeda.replace(/[^\d,]/g, '')
                .replace(/\./g, '')   // Remove pontos de milhar
                .replace(',', '.');   // Converte vírgula decimal para ponto

            const numero = parseFloat(valorLimpo);

            // Verifica se o resultado é um número válido
            return isNaN(numero) ? null : numero;
        } catch {
            return null;
        }
    }

}