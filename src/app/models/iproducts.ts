export interface IProducts {
  status:string;
  message:string;
  data:IProductData[];
}
export interface IProductData {
  product_id:number;
  product_name:string;
  product_description:string;
  product_images:string[];
  product_category:string;
  product_price:number;
  product_owner:number;
  is_favorite:boolean;
  in_cart:boolean;
}
