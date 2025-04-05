import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonAccordionGroup,
  IonAccordion,
  IonAvatar} from '@ionic/angular/standalone';
import { RickandmortyService } from '../services/rickandmorty.service';
import { JSON_EPISODES } from 'src/assets/imageEpisodes';

@Component({
  selector: 'app-tab-episodes',
  templateUrl: './tab-episodes.page.html',
  styleUrls: ['./tab-episodes.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonAccordionGroup, IonAccordion, IonItem,
    IonLabel, IonThumbnail, IonList,
    CommonModule, FormsModule, IonAvatar,
  ]
})
export class TabEpisodesPage implements OnInit {
  episodes: any[] = [];
  loading: boolean = true;
  error: any = null;

  episodesJSON: any[] = JSON_EPISODES.episodes;
  url_next: string = '';

  constructor(private rickandmortyService: RickandmortyService) { }

  ngOnInit() {
    this.loadEpisodes();
  }

  async loadEpisodes() {
    try {
      const resp: any = await this.rickandmortyService.getAllEpisodes().toPromise();
      this.episodes = resp.results.slice(0, 10); // Tomamos solo los primeros 10

      // Asignar la imagen desde el JSON local
      this.episodes.forEach((episode, index) => {
        if (this.episodesJSON[index]) {
          episode.image = this.episodesJSON[index].image_url;
        }
      });

      // Obtener los personajes de cada episodio
      await this.loadAllEpisodesCharacters();

      console.log("EPISODIOS: ", this.episodes);
      this.url_next = resp.info.next;
    } catch (error) {
      console.error("Error cargando episodios", error);
    }
  }

  async loadAllEpisodesCharacters() {
    for (let episode of this.episodes) {
      const characterUrls = episode.characters.slice(0, 5); // Limitar a 5 personajes por episodio (para optimizar)
      
      const characterRequests = characterUrls.map((url: string) => 
        this.rickandmortyService.getCharacterByNumber(url.split('/').pop()).toPromise()
      );

      try {
        const characters = await Promise.all(characterRequests);
        episode.characters = characters.map(char => ({
          name: char.name,
          image: char.image
        }));
      } catch (error) {
        console.error("Error cargando personajes", error);
      }
    }
  }
}