import { Routes } from '@angular/router';
import { ProductDashboardSignals2 } from './components/product-dashboard-signals2/product-dashboard-signals2';
import { ProductDashboardSignals1 } from './components/product-dashboard-signals1/product-dashboard-signals1';
import { CounterComponent } from './components/Counter-component/counter.component';

export const routes: Routes = [
  { path: 'counter', component: CounterComponent },
  { path: 'dashboard1', component: ProductDashboardSignals1 },
  { path: 'dashboard2', component: ProductDashboardSignals2 },
  { path: '', redirectTo: 'counter', pathMatch: 'full' }
];
