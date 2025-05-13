import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageUtils } from '../utils/localstorage.utils';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const localStorageUtils = inject(LocalStorageUtils);
    const router = inject(Router);

    const token = localStorageUtils.getToken();

    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(req).pipe(
        catchError((error) => {
            if (error.status === 401) {
            
                localStorageUtils.removerCredentials();
                
                router.navigate(['/login'], {
                    queryParams: { returnUrl: router.url }
                });
            }

            return throwError(() => error);
        })
    );
};