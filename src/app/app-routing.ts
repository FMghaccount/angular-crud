import { Routes } from '@angular/router';
import { ProductGuard } from './shared/guards/product.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/products/product-list/product-list.component').then(
        (module) => module.ProductListComponent
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./components/products/product-form/product-form.component').then(
        (module) => module.ProductFormComponent
      ),
  },
  {
    path: 'product/:id',
    canActivate: [ProductGuard],
    loadComponent: () =>
      import(
        './components/products/product-detail/product-detail.component'
      ).then((module) => module.ProductDetailComponent),
  },
  {
    path: 'product/:id/edit',
    canActivate: [ProductGuard],
    loadComponent: () =>
      import('./components/products/product-form/product-form.component').then(
        (module) => module.ProductFormComponent
      ),
  },
];
