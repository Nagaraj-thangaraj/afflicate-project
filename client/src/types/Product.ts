// src/types/Product.ts
export interface Product {
  _id: string;
  productUrl: string;
  productName: string;
  productPrice: string;
  productDescription: string;
  productGenre: string;
  productLink: string;
}
export interface ProductCreateRequest {
  productName: string;
  productPrice: string;
  productUrl: string;
  productDescription: string;
  productLink: string;
  productGenre: string;
}
