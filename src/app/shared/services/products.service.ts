import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import * as products from '../data/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Product[] = products.products;

  getProducts() {
    return this.products;
  }

  getProduct(productId: number) {
    return this.products.filter((product) => {
      return product.id === productId;
    });
  }

  addProduct(product: Product) {
    this.products.push(product);
    console.log(this.products);
  }

  updateProduct(product: Product, productId) {
    this.products[productId].price = product.price;
    this.products[productId].productDescription = product.productDescription;
    this.products[productId].image = product.image;
    this.products[productId].title = product.title;
    this.products[productId].pageTitle = product.pageTitle;
  }

  constructor() {}
}
