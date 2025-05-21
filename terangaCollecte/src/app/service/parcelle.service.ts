import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ParcelleService {

  constructor(private http: HttpClient, private configService: ConfigService) { }
  getAllParcellesBySection(sectionNumSec: string, region: string, departement: string, commune: string): Observable<any[]> {
    return this.http.get<any[]>(this.configService.getApiUrl('parcelles/bySection?sectionNumSec='+ sectionNumSec + '&region=' + region + '&nomDepart=' + departement + '&nomCommun=' + commune));
  }
}
