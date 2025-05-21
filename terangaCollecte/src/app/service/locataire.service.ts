import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class LocataireService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getLocataireCount(): Observable<number> {
    return this.http.get<number>(this.configService.getApiUrl('locataires/count'));
  }
}
