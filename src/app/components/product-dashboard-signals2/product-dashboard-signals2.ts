import { Component, signal, computed, inject, Signal, effect, input } from '@angular/core';
import {
  switchMap,
  map,
} from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'product-dashboard-signals2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-dashboard-signals2.html',
  styleUrl: './product-dashboard-signals2.scss'
})
export class ProductDashboardSignals2 {
  private productService = inject(ProductService);

  // -----> signal input
  readonly searchTerm = input('');

  selectedCategory = signal<string | null>(null);

  // Observable: search input stream
  private searchTerm$ = toObservable(this.searchTerm);

  // Observable: selectedCategory signal converted to observable
  private selectedCategory$ = toObservable(this.selectedCategory);

  // Combine (searchTerm + selectedCategory) then filter
  private filteredProducts$ = combineLatest([this.searchTerm$, this.selectedCategory$]).pipe(
    switchMap(([term, category]) =>
      this.productService.search(term || '').pipe(   // here we start initially with all products
        map(products =>
          category ? products.filter(p => p.category === category) : products
        )
      )
    )
  );

  // signal: for template binding
  filteredProducts: Signal<Product[]> = toSignal(this.filteredProducts$, { initialValue: [] });

  // Count (computed from filtered signal)
  productCount = computed(() => this.filteredProducts().length);
  constructor(private snackBar: MatSnackBar) {
    effect(() => {
      this.snackBar.open(`Found ${this.productCount()} product`, 'Close', {
        duration: 4000,
      });
    });
  }

  selectCategory(category: string | null) {
    this.selectedCategory.set(category);
  }
}
