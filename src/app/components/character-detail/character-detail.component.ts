import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RickandmortyService } from '../../services/rickandmorty.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class CharacterDetailComponent  implements OnInit {
  character: any;

  constructor(
    private route: ActivatedRoute,
    private api: RickandmortyService,
    private location: Location
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.getCharacterById(+id).subscribe(data => {
        this.character = data;
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
