import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { baseUrl } from "src/environments/environment";
import { LocalStorageService } from "./local-storage.service";

@Injectable()
export class TransactionsService {
  token: string = this.localStorageService.get('token');

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  getCategories(): Observable<any> {
    const headerDict = {
      'Authorization': `Bearer ${this.token}`,
    }

    return this.http.get(`${baseUrl}v1/transactions/categories`, { headers: new HttpHeaders(headerDict) })
  };

  getTransaction(): Observable<any> {
    const headerDict = {
      'Authorization': `Bearer ${this.token}`,
    }

    return this.http.get(`${baseUrl}v1/transactions`, { headers: new HttpHeaders(headerDict) })
  };


}