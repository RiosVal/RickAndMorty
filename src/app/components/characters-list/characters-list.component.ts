import { Component, OnInit } from '@angular/core';
import { RickandmortyService } from 'src/app/services/rickandmorty.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class CharactersListComponent  implements OnInit {
  characters: any[] = [];

  constructor(private api: RickandmortyService, private favService: FavoritesService) { }

  toggleFavorite(char: any) {
    this.favService.toggleFavorite(char);
  }
  
  isFavorite(char: any): boolean {
    return this.favService.isFavorite(char);
  }
  
  ngOnInit() {
    this.api.getCharacters().subscribe((data: any) => {
      this.characters = data.results;
    });
  }

}
