import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly apiBaseUrl = 'http://localhost:8081/api';

  getApiUrl(endpoint: string): string {
    return `${this.apiBaseUrl}/${endpoint}`;
  }
}
