import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http: HttpClient, private configService: ConfigService) { 
    // Nous utilisons le service de configuration pour l'URL de base
  }

  register(signRequest:any): Observable<any> {
    // Nous utilisons une URL relative à l'API mais pour le endpoint auth
    const authUrl = this.configService.getApiUrl('').replace('/api', '/auth');
    // Suppression de la barre oblique finale si elle existe pour éviter les doubles barres
    const cleanAuthUrl = authUrl.endsWith('/') ? authUrl.slice(0, -1) : authUrl;
    return this.http.post(`${cleanAuthUrl}/signup`, signRequest)
  }
  login(loginRequest:any): Observable<any> {
    // Nous utilisons une URL relative à l'API mais pour le endpoint auth
    const authUrl = this.configService.getApiUrl('').replace('/api', '/auth');
    // Suppression de la barre oblique finale si elle existe pour éviter les doubles barres
    const cleanAuthUrl = authUrl.endsWith('/') ? authUrl.slice(0, -1) : authUrl;
    return this.http.post(`${cleanAuthUrl}/login`, loginRequest)
  }

  
  
}
