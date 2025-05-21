import { HttpInterceptorFn } from '@angular/common/http';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {

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
  return next(requestToSend);
};
