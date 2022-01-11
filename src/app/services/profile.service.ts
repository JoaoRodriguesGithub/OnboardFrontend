import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class ProfileService {
  token: string = this.localStorageService.get('token');

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  getUsers(): Observable<any> {debugger
    const headerDict = {
      'Authorization': `Bearer ${this.token}`,
    }

    return this.http.get(`${baseUrl}v1/users`, { headers: new HttpHeaders(headerDict) })
  };
}
