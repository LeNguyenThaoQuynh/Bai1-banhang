
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent {
  detailProduct!: Product | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
    private authService: AuthService, // Inject AuthService
  ) {
    const { id } = this.activatedRoute.snapshot.params;
    this.detailProduct = this.storeService.products.find(
      (element) => element.id == parseInt(id),
    ) as Product;
    console.log(this.detailProduct);
  }

  addToCart(product: Product) {
    if (this.authService.isLoggedIn()) {
      this.storeService.addToCart(product);
      alert('Sản phẩm đã được thêm vào giỏ!');
    } else {
      alert('Vui lòng đăng nhập để thêm vào giỏ hàng!');
    }
  }

  buyNow(product: Product) {
    if (this.authService.isLoggedIn()) {
      this.storeService.addToCart(product);
      alert('Vui lòng đăng nhập để thêm vào giỏ hàng!');
      // Navigate to checkout page if necessary
    } else {
      alert('Vui lòng đăng nhập để thực hiện thanh toán!');
    }
  }
}
