import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProprietaireService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getProprietaireCount(): Observable<number> {
    return this.http.get<number>(this.configService.getApiUrl('proprietaires/count'));
  }

  getAllProprietaires(): Observable<any[]> {
    return this.http.get<any[]>(this.configService.getApiUrl('proprietaires/all'));
  }
}
