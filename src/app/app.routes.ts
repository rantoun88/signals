import { Routes } from '@angular/router';
import { ProductDashboardComponent } from './components/product-dashboard-signals/product-dashboard.component';
import {BasicComponent} from './components/BasicComponent/basic.component';

export const routes: Routes = [
  { path: 'basics', component: BasicComponent },
  { path: 'signals', component: ProductDashboardComponent },
  { path: 'rxjs-interop', component: ProductDashboardComponent },
  { path: '', redirectTo: 'basics', pathMatch: 'full' }
];
