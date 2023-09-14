import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from 'src/app/shared/model/product.model';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  editMode: boolean = false;
  productId: number;
  productForm: FormGroup;
  product: Product[];
  subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.productId = +params['id'];
      this.product = this.productService.getProduct(+params['id']);
      this.editMode = params['id'] != null;
      this.initForm();
      if (this.product.length > 0) {
        if (this.editMode) {
          this.title.setTitle('ویرایش - ' + this.product[0]?.pageTitle);
          if (this.meta.getTag(`name=description`)) {
            this.meta.updateTag(
              { name: 'description', content: `${this.product[0]?.pageTitle}` },
              `name='description'`
            );
          } else {
            this.meta.addTag({
              name: 'description',
              content: `${this.product[0]?.pageTitle}`,
            });
          }
          if (this.meta.getTag(`name=keywords`)) {
            this.meta.updateTag(
              { name: 'keywords', content: `${this.product[0]?.pageTitle}` },
              `name='keywords'`
            );
          } else {
            this.meta.addTag({
              name: 'keywords',
              content: `${this.product[0]?.pageTitle}`,
            });
          }
        } else {
          this.title.setTitle('افزودن محصول جدید');
        }
      } else {
        this.title.setTitle('افزودن محصول جدید');
      }
    });
  }

  get productTitle() {
    return this.productForm.get('productTitle');
  }
  get productDescription() {
    return this.productForm.get('productDescription');
  }
  get productImage() {
    return this.productForm.get('productImage');
  }
  get productPrice() {
    return this.productForm.get('productPrice');
  }

  private initForm() {
    let productTitle = '';
    let productDescription = '';
    let productPrice = 0;
    let productImage = '';

    if (this.editMode) {
      productTitle = this.product[0].pageTitle;
      productDescription = this.product[0].productDescription;
      productPrice = +this.product[0].price;
      productImage = this.product[0].image;
    }

    this.productForm = new FormGroup({
      productTitle: new FormControl(productTitle, [Validators.required]),
      productDescription: new FormControl(productDescription, [
        Validators.required,
      ]),
      productPrice: new FormControl(productPrice, [
        Validators.required,
        Validators.min(0),
      ]),
      productImage: new FormControl(productImage, [Validators.required]),
    });
  }

  onCancel() {
    this.productForm.reset();
    if (this.editMode) {
      this.editMode = false;
      this.router.navigate(['/product', this.productId]);
    } else {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    const newProduct: Product = new Product(
      this.productService.getProducts().length,
      0,
      this.productForm.value['productTitle'],
      this.productForm.value['productTitle'],
      '',
      this.productForm.value['productPrice'],
      true,
      this.productForm.value['productDescription'],
      2,
      this.productForm.value['productImage']
    );
    if (!this.editMode) {
      this.productService.addProduct(newProduct);
      this.router.navigate(['/product', this.productId]);
    } else {
      this.productService.updateProduct(newProduct, this.productId);
      this.router.navigate(['/']);
    }
    this.onCancel();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
