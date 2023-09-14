import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import * as products from '../data/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Product[] = products.products.reverse();

  getProducts() {
    return this.products;
  }

  getProduct(productId: number) {
    return this.products.filter((product) => {
      return product.id === productId;
    });
  }

  addProduct(product: Product) {
    this.products.unshift(product);
  }

  searchProducts(searchTerm: string) {
    return this.products.filter((product) => {
      return (
        product.pageTitle.includes(searchTerm.trim()) ||
        product.title.includes(searchTerm.trim())
      );
    });
  }

  updateProduct(product: Product, productId: number) {
    console.log(product);
    console.log(productId);

    this.products[this.products.length - 1 - productId].price = product.price;
    this.products[this.products.length - 1 - productId].productDescription =
      product.productDescription;
    this.products[this.products.length - 1 - productId].image = product.image;
    this.products[this.products.length - 1 - productId].title = product.title;
    this.products[this.products.length - 1 - productId].pageTitle =
      product.pageTitle;

    console.log(products);
  }

  constructor() {}
}
