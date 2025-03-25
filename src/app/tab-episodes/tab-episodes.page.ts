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
  IonSpinner,
  IonAccordionGroup,
  IonAccordion } from '@ionic/angular/standalone';
import { RickandmortyService } from '../services/rickandmorty.service';

@Component({
  selector: 'app-tab-episodes',
  templateUrl: './tab-episodes.page.html',
  styleUrls: ['./tab-episodes.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonAccordionGroup, IonAccordion, IonItem,
    IonLabel, IonThumbnail, IonSpinner, IonList,
    CommonModule, FormsModule
  ]
})
export class TabEpisodesPage implements OnInit {
  episodes: any[] = [];
  loading: boolean = true;
  error: any = null;

  constructor(private rickandmortyService: RickandmortyService) { }

  ngOnInit() {
    this.loadEpisodes();
  }

  loadEpisodes() {
    this.loading = true;
    this.error = null;
    
    this.rickandmortyService.getEpisodesWithImages().subscribe({
      next: (data: any[]) => {
        this.episodes = data;
        this.loading = false;
        console.log(this.episodes);
      },
      error: (err: any) => {
        this.error = err;
        this.loading = false;
        console.error('Error loading episodes:', err);
      }
    });
  }
}