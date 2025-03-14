import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  selectedBrand: string = 'all'; // Default to 'all'
  selectedPrice: string = 'all';
  selectedDelivery: string = '';

  constructor(private http: HttpClient,private _CartService:CartService) {}

  ngOnInit() {
    this.http.get<any[]>('assets/data.json').subscribe(data => {
      this.products = data;
      this.filteredProducts = data; // Initial load
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      return (
        // If "ALL" is selected, show all brands, otherwise filter by brand
        (this.selectedBrand === 'all' || product.brand === this.selectedBrand) &&
        // Check the selected price range
        (this.selectedPrice === 'all' ? true : this.checkPriceRange(product.currentPrice)) &&
        // Check delivery day
        (this.selectedDelivery ? product.deliveryDay.includes(this.selectedDelivery) : true)
      );
    });
  }

  checkPriceRange(price: number): boolean {
    switch (this.selectedPrice) {
      case 'under10000':
        return price <= 10000;
      case '10000to20000':
        return price > 10000 && price <= 20000;
      case '20000to30000':
        return price > 20000 && price <= 30000;
      case 'over30000':
        return price > 30000;
      default:
        return true;
    }
  }

  onBrandChange(value: string) {
    this.selectedBrand = value;
    this.filterProducts();
  }

  onPriceChange(value: string) {
    this.selectedPrice = value;
    this.filterProducts();
  }

  onDeliveryChange(value: string) {
    this.selectedDelivery = value;
    this.filterProducts();
  }
  addToCart(productId: number): void {
    this._CartService.addToCart(productId);
  }


  isFiltersVisible: boolean = false;

  toggleFilters() {
    this.isFiltersVisible = !this.isFiltersVisible;
    const filterContainer = document.getElementById('filters-container');
  
    if (filterContainer) {
      filterContainer.style.display = this.isFiltersVisible ? 'block' : 'none';
    }
  }
  
}
