export interface ICart {
  status: string
  message: string
  total: number
  data: ICartData[]
}

export interface ICartData {
  id: number
  product_price: number
  product: Product
}

export interface Product {
  product_id: number
  product_name: string
  product_description: string
  product_images: string[]
  product_category: string
  product_price: number
  product_owner: number
}
