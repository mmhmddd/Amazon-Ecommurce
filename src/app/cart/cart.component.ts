import { Component, OnInit } from '@angular/core';
import { Cart, CartService, Product } from '../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
  cart: Cart[] = [];
  products: Product[] = [];
  totalPrice = 0;
  cartItemsCount = 0;
  formattedTotalPrice: string = "";

  constructor(private _cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this._cartService.cart.subscribe((cart) => {
      this.cart = cart;
      this.loadCartProducts();
    });
    this._cartService.cartItemsCount.subscribe((count) => (this.cartItemsCount = count));
  }

  loadCartProducts(): void {
    this.totalPrice = 0;
    const productIds = new Set(this.cart.map(item => item.id));
    productIds.forEach((id) => {
      if (!this.products.find(product => product.id === id)) {
        this.getProductById(id).subscribe((product) => {
          if (product) {
            this.products.push(product);
            this.calculateTotalPrice();
          }
        });
      }
    });
    this.calculateTotalPrice();
  }

  getProductById(productId: number) {
    return this.http.get<Product[]>('assets/data.json').pipe(
      map((products) => products.find((p) => p.id === productId) || ({} as Product))
    );
  }

  getProductCount(productId: number): number {
    return this.cart.find((item) => item.id === productId)?.count || 0;
  }

  calculateTotalPrice(): void {
    this.totalPrice = this._cartService.cart.value
      .reduce((total, cartItem) => {
        const priceString = this.products.find((product) => product.id === cartItem.id)?.currentPrice || "0";
        const priceNumber = Number(priceString.replace(/\D/g, ""));
        return total + (priceNumber * cartItem.count);
      }, 0);

    this.formattedTotalPrice = new Intl.NumberFormat("en-IN", { 
      style: "currency", 
      currency: "INR",
      maximumFractionDigits: 0
    }).format(this.totalPrice);
  }
  
  updateQuantity(productId: number, newQuantity: number): void {
    this._cartService.updateQuantity(productId,newQuantity);
  }  

  removeProduct(productId: number): void {
    this._cartService.removeProduct(productId);
    this.cart = this.cart.filter(item => item.id !== productId);
    this.products = this.products.filter(product => product.id !== productId);
    this.calculateTotalPrice();
  }  

  clearCart(): void {
    this._cartService.clearCart();
  }
}

