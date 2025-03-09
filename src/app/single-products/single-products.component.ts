import { Component, OnInit } from '@angular/core';
import { GetourDataService } from '../services/getour-data.service';

@Component({
  selector: 'app-single-products',
  templateUrl: './single-products.component.html',
  styleUrls: ['./single-products.component.scss']
})
export class SingleProductsComponent implements OnInit{
  data:any;
  product:any;
  constructor(private fetchdata:GetourDataService){}
ngOnInit(): void {
  this.fetchdata.getData().subscribe((response)=>{
    const data=response;
    if (data.length > 0) {
      this.product = data[0]; // Get the first product
    }
    console.log(this.data); // for checking
  })
}

}
