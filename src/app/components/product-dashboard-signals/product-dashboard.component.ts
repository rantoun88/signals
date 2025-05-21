import { Component, OnInit, inject, signal, computed, effect, input, OnDestroy, output, model } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'product-dashboard-signals',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './product-dashboard.component.html',
  styleUrl: './product-dashboard.component.scss'
})
export class ProductDashboardComponent implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  private loadSubscription = Subscription.EMPTY ;
  private allProducts = signal<Product[]>([]);

  // -----> signal input
  readonly searchTerm = input('') ;

  selectedCategory = signal<string | null>(null);

  filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const term = this.searchTerm().toLowerCase();
    return this.allProducts().filter(
      (p) =>
        (!category || p.category === category) &&
        (!term || p.name.toLowerCase().includes(term))
    );
  });

  // for model clarification
  selected = model.required<number>();

  totalCount = computed(() => this.filteredProducts().length);

  constructor(private snackBar: MatSnackBar) {
    effect(() => {
      this.snackBar.open(`Found ${this.totalCount()} product`, 'Close', {
        duration: 4000,
        panelClass: ['custom-snackbar']
      });
    });
  }

  ngOnInit() {
    this.loadSubscription = this.productService.getAll().subscribe(this.allProducts.set);
  }

  // selectCategory with null value displays all the products or 'ALL' Category
  selectCategory(category: string | null) {
    this.selectedCategory.set(category);
  }

  ngOnDestroy() {
    if (this.loadSubscription) {
      this.loadSubscription.unsubscribe();
    }
  }
}
