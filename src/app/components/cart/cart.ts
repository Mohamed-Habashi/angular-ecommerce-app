import {Component, OnInit, signal} from '@angular/core';
import {ProductsService} from '../../services/products-service';
import {ICart} from '../../models/icart';
import {Header} from '../header/header';
import {Footer} from '../footer/footer';
import {CurrencyPipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [
    Header,
    Footer,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit{

  cart = signal<ICart | null>(null);

  isLoading=signal<boolean>(false)


  constructor(private _productService:ProductsService) {
  }

  ngOnInit() {
        this.getCartData()
    }

    removeFromCart(prodId:number){
    this._productService.toggleCart(prodId).subscribe({
      next: ()=>{
        this.getCartData()
      }
    });
    }

  getCartData(){
    this.isLoading.set(true);
    this._productService.getCartData().subscribe({
      next:(res)=>{
        console.log(res)
        this.cart.set(res);
        this.isLoading.set(false)
      },
      error:(err)=>{
        console.log("the error is "+err)
        this.isLoading.set(false);
      },
      complete:()=>{},
    })
  }

}
