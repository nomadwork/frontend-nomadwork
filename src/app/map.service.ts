import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  detailAboutThisPlace(id: number): Observable<any> {
    return this.http.post<any>('api/place-detail', { id });
  }
}
