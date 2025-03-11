import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetourDataService {
  private dataUrl = 'assets/data.json'; // Path to the JSON file , imagine it is an api

  constructor(private http : HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }
}
