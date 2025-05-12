import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'MacBook Pro', category: 'Laptops' },
    { id: 2, name: 'iPad', category: 'Tablets' },
    { id: 3, name: 'Galaxy Tab', category: 'Tablets' },
    { id: 4, name: 'Dell XPS', category: 'Laptops' },
    { id: 5, name: 'iPhone', category: 'Phones' },
  ];

  getAll(): Observable<Product[]> {
    return of(this.products).pipe(delay(500));
  }

  search(term: string): Observable<Product[]> {
    const lower = term.toLowerCase();
    return of(
      this.products.filter((p) => p.name.toLowerCase().includes(lower))
    ).pipe(delay(300));
  }
}
