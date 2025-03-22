import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  imports: [CommonModule, IonicModule]
})
export class FavoritesComponent  implements OnInit {
  favorites: any[] = [];

  constructor(private favService: FavoritesService, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favorites = this.favService.getFavorites();
  }

  toggleFavorite(char: any) {
    this.favService.toggleFavorite(char);
  }
  
  isFavorite(char: any): boolean {
    return this.favService.isFavorite(char);
  }

  async clearAllFavorites() {
    const alert = await this.alertCtrl.create({
      header: '¿Borrar todos?',
      message: 'Esta acción eliminará todos los favoritos.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Borrar',
          handler: () => {
            this.favService.clearFavorites();
            this.loadFavorites();
          }
        }
      ]
    });

    await alert.present();
  }

}
