import { Component, signal } from '@angular/core';
import { ProductDashboardRxjsComponent } from '../product-dashboard-rxjs-interop/product-dashboard-rxjs.component';
import { ProductDashboardComponent } from '../product-dashboard-signals/product-dashboard.component';
import { Router, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import {NgClass} from '@angular/common';
import { BasicComponent } from '../BasicComponent/basic.component';

@Component({
  selector: 'product-search',
  standalone: true,
  imports: [ProductDashboardComponent, ProductDashboardComponent, RouterModule, MatTabsModule, MatButtonModule, BasicComponent, ProductDashboardRxjsComponent, NgClass],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent {
  tabIndex = 0;
  search = signal('');

  selectedProductId = signal(5555);
  // as signal if I want a side effect when selectedProductId is changed (like defining computed signal or effect)

  constructor(private router: Router) {}

  updateSearchTerm(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value
    this.search.set(searchValue);
  }



  onTabChange(index: number) {
    this.tabIndex = index;
    const paths = ['basics', 'signals', 'rxjs-interop'];
    this.router.navigate([paths[index]]);
  }

}
