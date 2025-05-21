import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpClient, private configService: ConfigService) { }
  getAllSectionsByCommune(commune: string): Observable<any[]> {
    return this.http.get<any[]>(this.configService.getApiUrl('sections/byCommune?communeName='+ commune));
  }
}
