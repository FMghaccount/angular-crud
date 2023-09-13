import { ProductsService } from 'src/app/shared/services/products.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductGuard implements CanActivate {
  constructor(
    private router: Router,
    private productService: ProductsService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let product = this.productService.getProduct(+route.params['id']);
    if (product.length > 0) {
      return true;
    } else {
      return this.router.createUrlTree(['/']);
    }
  }
}
