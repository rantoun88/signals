import { Routes } from '@angular/router';
import { ProductDashboardSignals2 } from './components/product-dashboard-signals2/product-dashboard-signals2';
import { ProductDashboardSignals1 } from './components/product-dashboard-signals1/product-dashboard-signals1';
import {BasicComponent} from './components/BasicComponent/basic.component';

export const routes: Routes = [
  { path: 'basics', component: BasicComponent },
  { path: 'signals', component: ProductDashboardSignals1 },
  { path: 'rxjs-interop', component: ProductDashboardSignals2 },
  { path: '', redirectTo: 'counter', pathMatch: 'full' }
];
