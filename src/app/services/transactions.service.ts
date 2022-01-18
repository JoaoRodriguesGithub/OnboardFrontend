import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { baseUrl } from "src/environments/environment";
import { LocalStorageService } from "./local-storage.service";
import { tap } from 'rxjs/operators'

@Injectable()
export class TransactionsService {
  token: string = this.localStorageService.get('token');
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  get refresh$() {
    return this._refresh$;
  }
  
  getCategories(): Observable<any> {
    const headerDict = {
      'Authorization': `Bearer ${this.token}`,
    }

    return this.http.get(`${baseUrl}v1/transactions/categories`, { headers: new HttpHeaders(headerDict) })
  };
  
  getTransactions(): Observable<any> {
    const headerDict = {
      'Authorization': `Bearer ${this.token}`,
    }

    return this.http.get(`${baseUrl}v1/transactions`, { headers: new HttpHeaders(headerDict) })
  };

  getTransaction(id): Observable<any> {
    const headerDict = {
      'Authorization': `Bearer ${this.token}`,
    }

    return this.http.get(`${baseUrl}v1/transactions/${id}`, { headers: new HttpHeaders(headerDict) })
  };

  postTransaction(form): Observable<any> {
    const headerDict = {
      'Authorization': `Bearer ${this.token}`,
    }

    return this.http.post(`${baseUrl}v1/transactions`, form, { headers: new HttpHeaders(headerDict) })
      .pipe(
        tap(() => {
        this._refresh$.next();
      })
      )
  };

  deleteTransaction(transactionId): Observable<any> {
    const headerDict = {
      'Authorization': `Bearer ${this.token}`,
    }

    return this.http.delete(`${baseUrl}v1/transactions/${transactionId}`, { headers: new HttpHeaders(headerDict) })
  };

  editTransaction(data): Observable<any> {
    const headerDict = {
      'Authorization': `Bearer ${this.token}`,
    }

    return this.http.put(`${baseUrl}v1/transactions/${data.id}`, data, { headers: new HttpHeaders(headerDict) })
  }
}