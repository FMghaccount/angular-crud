import { ProductsService } from './../../../shared/services/products.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/shared/model/product.model';
import { ProductItemComponent } from '../product-item/product-item.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products: Product[];

  constructor(private productsService: ProductsService, private title: Title) {}

  ngOnInit() {
    this.title.setTitle('لیست محصولات');
    this.products = this.productsService.getProducts();
  }
}
