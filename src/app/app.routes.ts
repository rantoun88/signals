import { Routes } from '@angular/router';
import { ProductDashboardComponent } from './components/product-dashboard-signals/product-dashboard.component';
import {BasicComponent} from './components/BasicComponent/basic.component';


// we don't use the routes
export const routes: Routes = [
  { path: 'basics', component: BasicComponent },
  { path: 'signals', component: ProductDashboardComponent },
  { path: 'rxjs-interop', component: ProductDashboardComponent },
  { path: '', redirectTo: 'counter', pathMatch: 'full' }
];
