import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private toasts: any[] = [];

    showError(message: string, duration: number = 5000) {
        this.show(message, 'error', duration);
    }

    showSuccess(message: string, duration: number = 5000) {
        this.show(message, 'success', duration);
    }

    private show(message: string, type: 'error' | 'success', duration: number) {
        const toast = {
            message,
            type,
            duration
        };

        // Cria o componente de toast dinamicamente
        const toastElement = document.createElement('app-toast');
        toastElement.setAttribute('message', message);
        toastElement.setAttribute('type', type);
        toastElement.setAttribute('duration', duration.toString());

        document.body.appendChild(toastElement);
    }
}