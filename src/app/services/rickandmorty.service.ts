import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickandmortyService {
  private http = inject(HttpClient);
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor() { }

  getCharacters(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/character?page=${page}`);
  }
}
