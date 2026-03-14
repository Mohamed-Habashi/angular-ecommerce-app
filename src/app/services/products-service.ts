import {Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {IProducts} from '../models/iproducts';
import {environment} from '../../environments/environment.development';
import {IProductDetails} from '../models/iproduct-details';
import {ISearchProduct} from '../models/isearch-product';
import {ICart} from '../models/icart';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  products = signal<any>(null);



  constructor(private http: HttpClient) {
  }

  getAllProducts():Observable<IProducts>{

    return this.http.get<IProducts>(
      `${environment.baseUrl}products/get_products.php`,
    ).pipe(
      tap((res: IProducts) => this.products.set(res))
    );
  }
  getProductDetails(productId:number):Observable<IProductDetails>{

    return this.http.get<IProductDetails>(
      `${environment.baseUrl}/products/product_details.php/${productId}`
    )
  }

  searchProduct(text:string):Observable<ISearchProduct>{

   return this.http.post<ISearchProduct>(
      `${environment.baseUrl}products/search.php`,
     {
       text:text,
     }
    )
  }

  toggleFavourite(id:number):Observable<any>{
    return this.http.post(
      `${environment.baseUrl}favourites/favourite.php`,
      {
        product_id:id
      }
    );
  }

  toggleCart(proId: number): Observable<any> {
    return this.http.post(`${environment.baseUrl}cart/cart.php`, { product_id: proId }).pipe(
      tap((res: any) => {
        // بنحدث الـ Signal اللي موجود في السيرفس
        this.products.update(oldData => {
          if (!oldData) return oldData;

          const updatedArray = oldData.data.map((item: any) => {
            // ركز هنا: لازم يكون نفس اسم الـ ID (غالباً product_id)
            if (item.product_id == proId) {
              return { ...item, in_cart: res.in_cart }; // بنحدث الحالة
            }
            return item; // بنرجع المنتج زي ما هو لو مش ده المطلوب
          });

          return { ...oldData, data: updatedArray };
        });
      })
    );
  }
  getCartData():Observable<ICart>{

    return this.http.get<ICart>(
      `${environment.baseUrl}cart/get_cart.php`,
    );
  }

}
