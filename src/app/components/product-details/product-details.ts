import {Component, OnInit, signal} from '@angular/core';
import {ProductsService} from '../../services/products-service';
import {ActivatedRoute, Router} from '@angular/router';
import {IProductDetails} from '../../models/iproduct-details';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})

export class ProductDetails implements OnInit {
  isLoading=signal<boolean>(false);
  productDetails=signal<IProductDetails|null>(null)

  constructor(protected _productsService:ProductsService,private _activateRoutes:ActivatedRoute) {
  }

  ngOnInit(): void {
    let a=Number(this._activateRoutes.snapshot.paramMap.get('id'));

    this.getProductDetails(a)
    }

  getProductDetails(id:number){
    this.isLoading.set(true);
    this._productsService.getProductDetails(id).subscribe({
      next: (res) => {
        this.productDetails.set(res)
        this.isLoading.set(false);
        console.log(this.productDetails()?.data?.in_cart)
      },
      error: err => {
        this.isLoading.set(false);
      },
      complete: () => {},
    })
  }
}
