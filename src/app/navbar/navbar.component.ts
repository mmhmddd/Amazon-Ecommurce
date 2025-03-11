import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
 constructor(private _CartService:CartService){}
 cartCounter:number=0;
 ngOnInit(): void {
  this._CartService.cartItemsCount.subscribe((count) => {
    this.cartCounter = count;
  });;
 }
}
