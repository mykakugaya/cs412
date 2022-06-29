import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CovidApiService {

  private covidApiEndpoint = "http://localhost:3000/ps4";

  constructor( private http: HttpClient ) { }

  getCountry(country: string) {
    const body: object = {
      country: country
    }

    return this.http.post(this.covidApiEndpoint, body);
  }
}
