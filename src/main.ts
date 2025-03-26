import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { register as registerSwiperElements } from 'swiper/element/bundle';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { addIcons } from 'ionicons';
import {
  heart,
  heartOutline,
  arrowBackOutline,
  trashOutline,
  albumsSharp,
  personCircleOutline,
  star,
  tvSharp
} from 'ionicons/icons';

addIcons({
  'heart-outline': heartOutline,
  'heart': heart,
  'arrow-back-outline': arrowBackOutline,
  'trash-outline': trashOutline,
  'albums-sharp': albumsSharp,
  'person-circle-outline': personCircleOutline,
  'star': star,
  'tv-sharp': tvSharp
});

registerSwiperElements();

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
  ],
});
