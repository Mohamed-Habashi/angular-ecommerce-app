export interface IProductDetails {
status:string;
message:string;
data:IProductDetailsData,
}

export interface IProductDetailsData{
  product_id:number;
  product_name:string;
  product_description:string;
  product_images:string[];
  product_category:string;
  product_price:number;
  product_owner:number;
  is_favourite:boolean;
  in_cart:boolean;
}
