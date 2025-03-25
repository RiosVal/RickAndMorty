import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, map, switchMap, forkJoin, of } from 'rxjs';

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

  getCharacterById(id: number): Observable<any> {
    return this.http.get<any>(`https://rickandmortyapi.com/api/character/${id}`);
  }

  getAllEpisodes():any{
    let url=`${this.apiUrl}/episode`;
    return this.http.get(url, {}).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  getCharacterByNumber(number: any):any{
    let url=`${this.apiUrl}/character/${number}`
    return this.http.get(url, {}).pipe(
      map((res: any) => {
        return res
      })
    )
  } 
}
