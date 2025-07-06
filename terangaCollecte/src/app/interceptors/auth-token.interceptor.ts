import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (req.url.includes('/login') || req.url.includes('/signup')) {
    return next(req); // Passer la requête sans ajouter de token
  }

  let requestToSend = req;
  if(token) {
    const headers = req.headers.set('Authorization', `Bearer ${token}`);
    requestToSend = req.clone({
      headers: headers 
    });
  }

  return next(requestToSend).pipe(
    catchError(error => {
      // Si erreur 401 (non autorisé) ou 403 (interdit)
      if (error.status === 401 || error.status === 403) {
        // Nettoyer les données d'authentification
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('user');
        
        // Rediriger vers la page de login
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
