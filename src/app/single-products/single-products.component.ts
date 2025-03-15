import { Component, OnInit } from '@angular/core';
import { GetourDataService } from '../services/getour-data.service';
import { CartService } from '../services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-products',
  templateUrl: './single-products.component.html',
  styleUrls: ['./single-products.component.scss'],
})
export class SingleProductsComponent implements OnInit {
  data: any;
  product: any;
  constructor(
    private fetchdata: GetourDataService,
    private _CartService: CartService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        const id = param.get('id');
        if (id) {
          this.fetchdata.getData().subscribe((response) => {
            const data = response;
            this.product = data.find(
              (item: any) => item.id === id || item.id === Number(id)
            );
          });
        }
      },
    });
  }

  addToCart(productId: number): void {
    this._CartService.addToCartInDetailsPage(productId);
  }
}
