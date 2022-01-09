import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { baseUrl } from "src/environments/environment";


@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data): Observable<any> {
    return this.http.post(`${baseUrl}auth/signin`, data);
  }

  getCompanies(companies): Observable<any> {
    return this.http.get(`${baseUrl}auth/signup`)
  }

  signup(form): Observable<any> {
    debugger
    return this.http.post(`${baseUrl}auth/signup`, form);
  }

};