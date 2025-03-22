import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab-episodes',
  templateUrl: './tab-episodes.page.html',
  styleUrls: ['./tab-episodes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TabEpisodesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
