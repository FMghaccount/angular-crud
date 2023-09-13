import { Routes } from '@angular/router';

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
    loadComponent: () =>
      import(
        './components/products/product-detail/product-detail.component'
      ).then((module) => module.ProductDetailComponent),
  },
  {
    path: 'product/:id/edit',
    loadComponent: () =>
      import('./components/products/product-form/product-form.component').then(
        (module) => module.ProductFormComponent
      ),
  },
];
