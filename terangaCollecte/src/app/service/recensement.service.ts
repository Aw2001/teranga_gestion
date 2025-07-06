import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class RecensementService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getRecensementCount(): Observable<number> {
    return this.http.get<number>(this.configService.getApiUrl('recensements/count'));
  }

  getAllRecensements(): Observable<any[]> {
    return this.http.get<any[]>(this.configService.getApiUrl('recensements/all'));
  }

  createRecensement(recensement: any): Observable<any> {
    return this.http.post(this.configService.getApiUrl('recensements/add'), recensement);
  }

  createRecensementUser(recensementUser: any): Observable<any> {
    return this.http.post(this.configService.getApiUrl('recensementUtilisateurs/add'), recensementUser);
  }
  updateRecensement(numRecensement: string, recensement: any): Observable<any> {
    return this.http.put(this.configService.getApiUrl(`recensements/update/${numRecensement}`), recensement);
  }
}
