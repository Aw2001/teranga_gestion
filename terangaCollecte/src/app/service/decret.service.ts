import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class DecretService {

  // Les URLs seront générées via le ConfigService


  constructor(private http: HttpClient, private configService: ConfigService) { }

  // Méthode pour récupérer les secteurs
  getSecteurs(commune: string): Observable<any> {

    const params = new HttpParams()

      .set('commune', commune);

    return this.http.get(this.configService.getApiUrl('decret/secteurs'), { params });
  }

  //recupérer le prix m2 du terrain
  getPrix(region: string, departement: string, commune: string, secteur: string, zone: string): Observable<number> {

    const params = new HttpParams()
      .set('region', region)
      .set('departement', departement)
      .set('commune', commune)
      .set('secteur', secteur)
      .set('zone', zone);

    return this.http.get<number>(this.configService.getApiUrl('decret/prixTerrain'), { params });


  }

  //recupérer les départements en fonction de la région
  getDepartements(region: string): Observable<any> {

    const params = new HttpParams()
      .set('region', region)

    return this.http.get(this.configService.getApiUrl('decret/departements'), { params });
  }

  //recupérer les communes en fonction du département
  getCommunes(departement: string): Observable<any> {

    const params = new HttpParams()
      .set('departement', departement)

    return this.http.get(this.configService.getApiUrl('decret/communes'), { params });
  }

  getZones(region: string, departement: string, commune: string, secteur: string): Observable<any> {

    const params = new HttpParams()
      .set('region', region)
      .set('departement', departement)
      .set('commune', commune)
      .set('secteur', secteur)

    return this.http.get(this.configService.getApiUrl('decret/zones'), { params });
  }
  

}
