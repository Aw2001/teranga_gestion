import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getAllDepartementsByRegion(region: string): Observable<any[]> {
    return this.http.get<any[]>(this.configService.getApiUrl('departements/byRegion?regionName='+ region));
  }
}
