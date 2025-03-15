import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Cart {
  id: number;
  count: number;
}
export interface Product {
  id: number;
  brand: string;
  name: string;
  image: string;
  currentPrice: string;
  discountPercentage: string;
  rating: {
    stars: string;
    count: number;
    boughtCount: number;
  };
}


@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: BehaviorSubject<Cart[]> = new BehaviorSubject(this.getUserCart());
  cartItemsCount: BehaviorSubject<number> = new BehaviorSubject(
    this.getCartItemsCount()
  );

  constructor() {}

  getUserCart(): Cart[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  getCartItemsCount(): number {
    return this.cart.value.reduce((total, item) => total + item.count, 0);
  }

  updateCart(cart: Cart[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cart.next(cart);
    this.cartItemsCount.next(this.getCartItemsCount());
  }

  addToCartInDetailsPage(productId: number): void {
    const quantitySelect = document.getElementById('quantitySelect') as HTMLSelectElement;
    const selectedText = quantitySelect.value;
    
    const selectedQuantity = parseInt(selectedText.split(':')[1].trim(), 10);
  
    let cart = this.cart.value;
    let product = cart.find((item) => item.id === productId);
  
    if (product) {
      product.count += selectedQuantity;
    } else {
      cart.push({ id: productId, count: selectedQuantity });
    }
  
    this.updateCart(cart);

  }
  
  addToCartInProductsPage(productId: number): void {
    let cart = this.cart.value;
    let product = cart.find((item) => item.id === productId);
    if (product) {
      product.count += 1;
    } else {
      cart.push({ id: productId, count: 1 });
    }
    this.updateCart(cart);
  }

  updateQuantity(productId: number, newQuantity: number): void {
    let cart = this.cart.value;
    let productIndex = cart.findIndex((item) => item.id === productId);

    if (productIndex !== -1) {
      if (newQuantity > 0) {
        cart[productIndex].count = newQuantity;
      } else {
        cart.splice(productIndex, 1);
      }
      this.updateCart(cart);
    }
  }

  removeProduct(productId: number): void {
    let cart = this.cart.value;
    let productIndex = cart.findIndex((item) => item.id === productId);
    cart.splice(productIndex, 1);
    this.updateCart(cart);
  }

  clearCart(): void {
    this.updateCart([]);
  }
}
