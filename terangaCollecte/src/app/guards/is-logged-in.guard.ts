import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

    if (token && !isTokenExpired(token)) {
      return true; // Autoriser l'accès si un token existe
      
    } else {
      router.navigate(['/login']); // Rediriger vers la page de connexion
      return false;
    }

};
// Fonction pour vérifier si le token est expiré
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Décoder le payload du JWT
    const expiration = payload.exp * 1000; // Convertir en millisecondes
    return Date.now() >= expiration; // Vérifier si l'expiration est passée
    
  } catch (error) {
    return true; // Si une erreur survient, considérer le token comme invalide
  }
}
