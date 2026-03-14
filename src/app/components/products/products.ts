import {Component, OnInit, signal} from '@angular/core';
import {IProducts} from '../../models/iproducts';
import {ProductsService} from '../../services/products-service';
import {Footer} from '../footer/footer';
import {Header} from '../header/header';
import { RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';
import {ICart} from '../../models/icart';

@Component({
  selector: 'app-products',
  imports: [
    Footer,
    Header,
    RouterLink,
    NgClass
  ],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {

  isLoading = signal(false);
  get products() {
    return this._productsService.products;
  }

  constructor(private _productsService: ProductsService) {
  }



  ngOnInit() {
        this.getAllProducts();
    }

  getAllProducts(){
    this.isLoading.set(true);
    this._productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products.set(res);
        console.log(this.products()?.data[0].is_favorite)
        this.isLoading.set(false);
      },
      error: err => {
        console.log(err)
        this.isLoading.set(false);
      },
      complete: () => {},
    })
  }

  handleSearch(text: string) {
    console.log("SEARCH TEXT:", text);
    if (!text) {
      this.getAllProducts();
      return;
    }

    this._productsService.searchProduct(text).subscribe({
      next: (res) => {
        console.log("API RESULT:", res);
        this.products.set(res);
      }
    });
  }

  toggleFavourite(prodId:number){
    this._productsService.toggleFavourite(prodId).subscribe({
      next:(res)=>{
        this.products.update(oldData=>{
          if(!oldData)return oldData;
          let newProducts=oldData.data.map((item:any)=>{
            if(item.product_id==prodId){
              return {...item,is_favorite:res.is_favorite}
            }

            return item
          })

          return {...oldData,data:newProducts}
        });
      }
    })
  }

  toggleCart(prodId:number){
    this._productsService.toggleCart(prodId).subscribe()
  }



}
