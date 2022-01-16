import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { tap } from 'rxjs/operators'

@Injectable()
export class ProfileService {
  token: string = this.localStorageService.get('token');
  private _refresh$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  get refresh$() {
    return this._refresh$;
  }
  getUsers(): Observable<any> {
    const headerDict = {
      'Authorization': `Bearer ${this.token}`,
    }

    return this.http.get(`${baseUrl}v1/users`, { headers: new HttpHeaders(headerDict) })
  };

  getUser(id): Observable<any> {
    const headerDict = {
      'Authorization': `Bearer ${this.token}`,
    }

    return this.http.get(`${baseUrl}v1/users/${id} `, { headers: new HttpHeaders(headerDict) })
  };

  AddUser(data): Observable<any> {
    const headerDict = {
      'Authorization': `Bearer ${this.token}`,
    }

    return this.http.post(`${baseUrl}v1/users`, data, { headers: new HttpHeaders(headerDict) })
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
  };
  editUser(data): Observable<any> {
    const headerDict = {
      'Authorization': `Bearer ${this.token}`,
    }

    return this.http.put(`${baseUrl}v1/users/${data.id}`, data, { headers: new HttpHeaders(headerDict) })
  }
}
