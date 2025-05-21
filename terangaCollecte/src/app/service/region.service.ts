import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getAllRegions(): Observable<any[]> {
    return this.http.get<any[]>(this.configService.getApiUrl('regions/all'));
  }
}
