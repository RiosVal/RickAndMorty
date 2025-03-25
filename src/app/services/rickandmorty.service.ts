import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, map, switchMap, forkJoin, of } from 'rxjs';
import { IMAGES_EPISODES } from 'src/assets/imageEpisodes';

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
  
  getEpisodesWithImages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/episode`).pipe(
      switchMap((response: any) => {
        const allEpisodes = this.getAllEpisodes(response);
        return allEpisodes.pipe(
          map(episodes => this.addImagesToEpisodes(episodes))
        );
      })
    );
  }

  private getAllEpisodes(firstPage: any): Observable<any[]> {
    const pages = firstPage.info.pages;
    const requests = [];
    
    for(let i = 1; i <= pages; i++) {
      requests.push(this.http.get(`${this.apiUrl}/episode?page=${i}`));
    }

    return forkJoin(requests).pipe(
      map((responses: any[]) => {
        return responses.reduce((acc, curr) => 
          acc.concat(curr.results), []);
      })
    );
  }

  private addImagesToEpisodes(episodes: any[]): any[] {
    return episodes.map(episode => {
      const episodeCode = episode.episode.substring(1);
      const [season, episodeNumber] = episodeCode.split('E');
      
      const imageData = IMAGES_EPISODES.find((img: { season: number; episode: number; }) => 
        img.season === parseInt(season) && 
        img.episode === parseInt(episodeNumber)
      );

      return {
        ...episode,
        image_url: imageData?.image_url || null
      };
    });
  }
}
