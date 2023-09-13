import { Routes } from '@angular/router';

export const ProductsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./products-page/products-page.component').then(
        (module) => module.ProductsPageComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./product-list/product-list.component').then(
            (module) => module.ProductListComponent
          ),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./product-form/product-form.component').then(
            (module) => module.ProductFormComponent
          ),
      },
      {
        path: 'product/:id',
        loadComponent: () =>
          import('./product-detail/product-detail.component').then(
            (module) => module.ProductDetailComponent
          ),
      },
      {
        path: 'product/:id/edit',
        loadComponent: () =>
          import('./product-form/product-form.component').then(
            (module) => module.ProductFormComponent
          ),
      },
    ],
  },
];
