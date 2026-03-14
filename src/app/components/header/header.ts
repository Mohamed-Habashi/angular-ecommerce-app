import {Component, EventEmitter, Output, output, signal} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {LoginService} from '../../services/login-service';
import {ProductsService} from '../../services/products-service';
import {ISearchProduct} from '../../models/isearch-product';
import {IUserData} from '../../models/iuser-data';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {


  @Output() text=new EventEmitter<string>();

  currentUser:IUserData|null = null;

  constructor(private _router:Router,private _loginService:LoginService,private _productsService:ProductsService) {
    this._loginService.user$.subscribe(user=>{
      this.currentUser=user;

    })
  }

  userLogout() {
    this._loginService.logout();
    localStorage.removeItem('token');
    this._router.navigateByUrl('/Login');
  }


  searchProduct(text:string){
    this.text.emit(text);
  }



}
