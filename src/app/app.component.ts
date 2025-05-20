import { Component} from '@angular/core';
import { ProductSearchComponent } from './components/product-dashboard-search/product-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductSearchComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
