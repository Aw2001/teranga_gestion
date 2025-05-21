import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CommuneService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

   getAllCommunesByDepartement(departement: string): Observable<any[]> {
      return this.http.get<any[]>(this.configService.getApiUrl('communes/byDepartement?departementName='+ departement));
    }
}
