import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BaremeService {

  // Les URLs seront générées via le ConfigService


  constructor(private http: HttpClient, private configService: ConfigService) { }

  //recupérer le prix d'un immeuble collectif
  getPrixImmeubleCollectif(region: string, categorie: string): Observable<number> {
    
    const params = new HttpParams()
      .set('region', region)
      .set('categorie', categorie);
    
    return this.http.get<number>(this.configService.getApiUrl('baremePrixImmeubleCollectif/prix'), { params});


  }

  //recupérer le prix d'un immeuble individuel
  getPrixImmeubleIndividuel(region: string, categorie: string): Observable<number> {
    
    const params = new HttpParams()
      .set('region', region)
      .set('categorie', categorie);
    
    return this.http.get<number>(this.configService.getApiUrl('baremePrixImmeubleIndividuel/prix'), { params});


  }

  //recupérer le prix de cours
  getPrixCours(region: string, categorie: string): Observable<number> {
    
    const params = new HttpParams()
      .set('region', region)
      .set('categorie', categorie);
    
    return this.http.get<number>(this.configService.getApiUrl('baremePrixCours/prix'), { params});


  }
  //recupérer le prix de cloture
  getPrixCloture(region: string, categorie: string): Observable<number> {
    
    const params = new HttpParams()
      .set('region', region)
      .set('categorie', categorie);
    
    return this.http.get<number>(this.configService.getApiUrl('baremePrixCloture/prix'), { params});


  }
}
