import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private storageKey = 'favorites';
  private favorites: any[] = [];

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const stored = localStorage.getItem(this.storageKey);
    this.favorites = stored ? JSON.parse(stored) : [];
  }

  private saveFavorites(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
  }

  getFavorites(): any[] {
    return this.favorites;
  }

  isFavorite(character: any): boolean {
    return this.favorites.some(fav => fav.id === character.id);
  }

  toggleFavorite(character: any): void {
    if (this.isFavorite(character)) {
      this.favorites = this.favorites.filter(fav => fav.id !== character.id);
    } else {
      this.favorites.push(character);
    }
    this.saveFavorites(); // Guardar al cambiar
  }

  clearFavorites(): void {
    this.favorites = [];
    this.saveFavorites(); // Actualiza localStorage también
  }
  
}
