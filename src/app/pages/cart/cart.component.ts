
import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: { product: Product; quantity: number }[] = [];
  total: number = 0;

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.cartItems = this.storeService.getCartItems();
    this.total = this.storeService.getCartTotal();
  }

  removeFromCart(productId: number) {
    this.storeService.removeFromCart(productId);
    this.cartItems = this.storeService.getCartItems();
    this.total = this.storeService.getCartTotal();
  }

  increaseQuantity(productId: number) {
    this.storeService.increaseQuantity(productId);
    this.cartItems = this.storeService.getCartItems();
    this.total = this.storeService.getCartTotal();
  }

  decreaseQuantity(productId: number) {
    this.storeService.decreaseQuantity(productId);
    this.cartItems = this.storeService.getCartItems();
    this.total = this.storeService.getCartTotal();
  }

  checkout() {
    this.storeService.clearCart();
    this.cartItems = [];
    this.total = 0;
    alert('Thanh toán thành công! Giỏ hàng đã được xóa.');
  }
}
