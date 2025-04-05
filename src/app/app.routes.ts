import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },  {
    path: 'scan-barcode',
    loadComponent: () => import('./scan-barcode/scan-barcode.page').then( m => m.ScanBarcodePage)
  },

];
