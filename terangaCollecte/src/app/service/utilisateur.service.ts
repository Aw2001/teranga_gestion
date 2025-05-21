import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  retourneInitial(username: string): Observable<any> {
    return this.http.get(this.configService.getApiUrl('utilisateurs/initial/'+username), {
      responseType: 'text' as 'json'
    });
  }

  retournerEmail(username: string): Observable<any> {
    
    return this.http.get(this.configService.getApiUrl('utilisateurs/getEmail/'+username), {
      responseType: 'text' as 'json'
    });
  }

  retournerAgents(): Observable<any> {
    return this.http.get(this.configService.getApiUrl('utilisateurs/all/agents'), {
      responseType: 'text' as 'json'
    });
  }
  // methode de déconnexion
  logout(email: string): Observable<any> {
   
    return this.http.post(this.configService.getApiUrl('utilisateurs/logout?email='+email), {});
    
  }

}
