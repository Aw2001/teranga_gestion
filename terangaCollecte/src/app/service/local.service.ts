import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  // L'URL sera générée via le ConfigService

  constructor(private http: HttpClient, private configService: ConfigService) { }

  // Méthode pour récupérer les biens
    getAllBiens(): Observable<any> {
      return this.http.get(this.configService.getApiUrl('biens/all'));
    }

    getBienCount(): Observable<number> {
      return this.http.get<number>(this.configService.getApiUrl('biens/count'));
    }
  
    getAllBiensByNicad(nicad: string): Observable<any[]> {
      return this.http.get<any[]>(this.configService.getApiUrl('biens/all/' + nicad));
    }

    saveBien(bien: any): Observable<any> {
      return this.http.post(this.configService.getApiUrl('biens/web/add'), bien);
    }

    getBienById(idBien: string): Observable<any> {
      return this.http.get(this.configService.getApiUrl('biens/research/' + idBien));
    }

    updateBien(bien: any): Observable<any> {
      return this.http.put(this.configService.getApiUrl('biens/web/update/'), bien);
    }
  
}
