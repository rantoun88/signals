import { Component, OnInit, inject, signal, computed, effect, input, OnDestroy, output, model } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'product-dashboard-signals1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './product-dashboard-signals1.html',
  styleUrl: './product-dashboard-signals1.scss'
})
export class ProductDashboardSignals1 implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  private loadSubscription = Subscription.EMPTY ;

  // -----> signal input
  searchTerm = input('') ;

  // for model clarification
  selected = model.required<number>();

  // ----> signal output
  readonly productClicked = output<Product>();


  selectedCategory = signal<string | null>(null);
  allProducts = signal<Product[]>([]);

  filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const term = this.searchTerm().toLowerCase() || '';
    return this.allProducts().filter(
      (p) =>
        (!category || p.category === category) &&
        (!term || p.name.toLowerCase().includes(term))
    );
  });

  selectedCount = computed(() => this.filteredProducts().length);

  constructor(private snackBar: MatSnackBar) {
    effect(() => {
      const products = this.filteredProducts();
      console.log(`Filteredlist updated: ${products.length} product(s)`);
      this.snackBar.open(`Found ${products.length} product`, 'Close', {
        duration: 2000,
      });
    });
  }

  ngOnInit() {
    this.loadSubscription = this.productService.getAll().subscribe(this.allProducts.set);
  }

  selectCategory(category: string | null) {
    this.selectedCategory.set(category);
  }

  ngOnDestroy() {
    if (this.loadSubscription) {
      this.loadSubscription.unsubscribe();
    }
  }

  onProductClick(product: Product) {
    this.productClicked.emit(product);
  }
}
