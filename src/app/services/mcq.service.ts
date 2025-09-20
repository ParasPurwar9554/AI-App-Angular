import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class McqService {

  constructor(private http: HttpClient) { }

  generateMcq(mcqPayload: any): Observable<any> {
    return this.http.post('http://localhost:3000/mcq-generator', mcqPayload);
  }
}
