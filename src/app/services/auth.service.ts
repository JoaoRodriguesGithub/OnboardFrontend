import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { baseUrl } from "src/environments/environment";


@Injectable()
export class AuthService{

constructor(private http:HttpClient) {}

login(data):Observable<any> {
  console.log('I am server')
  return this.http.post(`${baseUrl}auth/signin`, data);
}

getCompanies(companies):Observable<any> {
  return this.http.get(`${baseUrl}auth/signup`)
}

};