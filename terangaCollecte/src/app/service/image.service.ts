import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  saveImage(idBien: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(
      this.configService.getApiUrl(`images/add/${idBien}`),
      formData
    );
  }

  returnImage(idBien: string): Observable<any> {
    return this.http.get(this.configService.getApiUrl(`images/research/${idBien}`));
  }
}
