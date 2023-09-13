import { ProductsService } from './../../../shared/services/products.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Product } from 'src/app/shared/model/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  productSubscription: Subscription;
  productId: number;
  product: Product;
  productSpecs: [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    this.productSubscription = this.activatedRoute.params
      .pipe(
        map((params) => {
          return +params['id'];
        })
      )
      .subscribe((id) => {
        this.product = this.productService.getProduct(id)[0];
        this.title.setTitle(this.product?.pageTitle);
        if (this.meta.getTag(`name=description`)) {
          this.meta.updateTag(
            { name: 'description', content: `${this.product?.pageTitle}` },
            `name='description'`
          );
        } else {
          this.meta.addTag({
            name: 'description',
            content: `${this.product?.pageTitle}`,
          });
        }
        if (this.meta.getTag(`name=keywords`)) {
          this.meta.updateTag(
            { name: 'keywords', content: `${this.product?.pageTitle}` },
            `name='keywords'`
          );
        } else {
          this.meta.addTag({
            name: 'keywords',
            content: `${this.product?.pageTitle}`,
          });
        }
      });
  }
}
