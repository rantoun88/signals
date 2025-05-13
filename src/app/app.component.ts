import { Component, input, InputSignal, signal } from '@angular/core';
import { ProductDashboardSignals1 } from './components/product-dashboard-signals1/product-dashboard-signals1';
import { ProductDashboardSignals2 } from './components/product-dashboard-signals2/product-dashboard-signals2';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { NgIf } from '@angular/common';
import { CounterComponent } from './components/Counter-component/counter.component';
import { Product } from '../app/models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductDashboardSignals2, ProductDashboardSignals1, RouterModule, MatTabsModule, MatButtonModule, NgIf, CounterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  tabIndex = 0;
  search = signal('');

  selectedProduct = 1;
  constructor(private router: Router) {}

  onTabChange(index: number) {
    this.tabIndex = index;
    const paths = ['counter', 'signals', 'rxjs-interop'];
    this.router.navigate([paths[index]]);
  }

  updateSearchTerm(value: string) {
    this.search.set(value);
  }

  handleProductClickInApp(product: Product) {
    console.log(`Product ${product.name} clicked`)
  }
}
