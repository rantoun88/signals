import { Component, input, InputSignal, signal } from '@angular/core';
import { ProductDashboardSignals1 } from './components/product-dashboard-signals1/product-dashboard-signals1';
import { ProductDashboardSignals2 } from './components/product-dashboard-signals2/product-dashboard-signals2';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { NgIf } from '@angular/common';
import { Product } from '../app/models/product.model';
import {BasicComponent} from './components/BasicComponent/basic.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductDashboardSignals2, ProductDashboardSignals1, RouterModule, MatTabsModule, MatButtonModule, NgIf, BasicComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  tabIndex = 0;
  search = signal('');

  selectedProductId = signal(1);
  // as signal if I want a side effect when selectedProductId is changed (like defining computed signal or effect)


  constructor(private router: Router) {}

  onTabChange(index: number) {
    this.tabIndex = index;
    const paths = ['basics', 'signals', 'rxjs-interop'];
    this.router.navigate([paths[index]]);
  }

  updateSearchTerm(value: string) {
    this.search.set(value);
  }

  handleProductClickInApp(product: Product) {
    //console.log(`Product ${product.name} clicked`)
  }
}
