import { Component, OnInit } from '@angular/core';
import { RickandmortyService } from 'src/app/services/rickandmorty.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
  imports: [CommonModule],
})
export class CharactersListComponent  implements OnInit {
  characters: any[] = [];

  constructor(private api: RickandmortyService) { }

  ngOnInit() {
    this.api.getCharacters().subscribe((data: any) => {
      this.characters = data.results;
    });
  }

}
