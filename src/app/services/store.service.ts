
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private authService: AuthService) { }

  products: Product[] = [
    {
      id: 1,
      name: 'Sách 1',
      price: 100000,
      description: 'Description Product New 1',
      inStock: 10,
      imageUrl: '../assets/Anh1.jpg',
      author: 'Author 1',
      category: 'Category 1',
      publisher: 'Publisher 1',
      publicationDate: new Date('2023-01-01'),
      rating: 4.5,
      seller: 'ABC',
    },
    {
      id: 2,
      name: 'Sách 2',
      price: 200000,
      description: 'test',
      inStock: 10,
      imageUrl: '../assets/Anh2.jpg',
      author: 'Author 2',
      category: 'Category 2',
      publisher: 'Publisher 2',
      publicationDate: new Date('2023-02-01'),
      rating: 5.0,
      seller: 'ABC',
    },
    {
      id: 3,
      name: 'Sách 3',
      price: 300000,
      description: 'Description Product New 3',
      inStock: 10,
      imageUrl: '../assets/Anh3.jpg',
      author: 'Author 3',
      category: 'Category 3',
      publisher: 'Publisher 3',
      publicationDate: new Date('2023-03-01'),
      rating: 4.7,
      seller: 'ABC',
    },
    {
      id: 4,
      name: 'Sách 4',
      price: 400000,
      description: 'Description Product New 4',
      inStock: 10,
      imageUrl: '../assets/Anh4.jpg',
      author: 'Author 4',
      category: 'Category 4',
      publisher: 'Publisher 4',
      publicationDate: new Date('2023-04-01'),
      rating: 4.2,
      seller: 'ABC',
    },
    {
      id: 5,
      name: 'Sách 5',
      price: 500000,
      description: 'Description Product New 5',
      inStock: 10,
      imageUrl: '../assets/Anh5.jpg',
      author: 'Author 5',
      category: 'Category 5',
      publisher: 'Publisher 5',
      publicationDate: new Date('2023-01-01'),
      rating: 4.5,
      seller: 'ABC',
    },
    {
      id: 6,
      name: 'Sách 6',
      price: 600000,
      description: 'test',
      inStock: 10,
      imageUrl: '../assets/Anh6.jpg',
       author: 'Author 6',
      category: 'Category 6',
      publisher: 'Publisher 6',
      publicationDate: new Date('2023-02-01'),
      rating: 5.0,
      seller: 'ABC',
    },
    {
      id: 7,
      name: 'Sách 7',
      price: 700000,
      description: 'Description Product New 7',
      inStock: 10,
      imageUrl: '../assets/Anh7.jpg',
      author: 'Author 7',
      category: 'Category 7',
      publisher: 'Publisher 7',
      publicationDate: new Date('2023-03-01'),
      rating: 4.8,
      seller: 'ABC',
    },
    {
      id: 8,
      name: 'Sách 8',
      price: 800000,
      description: 'Description Product New 8',
      inStock: 10,
      imageUrl: '../assets/Anh8.jpg',
      author: 'Author 8',
      category: 'Category 8',
      publisher: 'Publisher 8',
      publicationDate: new Date('2023-04-01'),
      rating: 5.0,
      seller: 'ABC',
    },
  ];
  cart: { product: Product; quantity: number }[] = [];

  addToCart(product: Product) {
    if (this.authService.isLoggedIn()) { // Kiểm tra đăng nhập
      let cartItem = this.cart.find((item) => item.product.id === product.id);

      if (product.inStock > 0) {
        if (cartItem) {
          cartItem.quantity++;
        } else {
          this.cart.push({ product, quantity: 1 });
        }

        // Cập nhật số lượng hàng tồn kho
        product.inStock--;

        console.log('Cart:', this.cart);
      } else {
        alert('This product is out of stock.');
      }
    } else {
      alert('Please login to add products to the cart.');
    }
  }

  removeFromCart(productId: number) {
    const index = this.cart.findIndex((item) => item.product.id === productId);
    if (index !== -1) {
      const item = this.cart[index];
      this.cart.splice(index, 1);

      // Cập nhật số lượng hàng tồn kho
      this.products.find((p) => p.id === productId)!.inStock += item.quantity;

      console.log('Cart after removal:', this.cart);
    }
  }

  getCartItems() {
    return this.cart;
  }

  getCartTotal() {
    return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  clearCart() {
    this.cart.forEach(item => {
      // Cập nhật số lượng hàng tồn kho cho từng mặt hàng
      const product = this.products.find(p => p.id === item.product.id);
      if (product) {
        product.inStock += item.quantity;
      }
    });
    this.cart = [];
    console.log('Cart has been cleared.');
  }

  increaseQuantity(productId: number) {
    const cartItem = this.cart.find(item => item.product.id === productId);
    if (cartItem && cartItem.product.inStock > 0) {
      cartItem.quantity++;
      cartItem.product.inStock--;
      console.log('Cart after increasing quantity:', this.cart);
    } else {
      alert('This product is out of stock.');
    }
  }

  decreaseQuantity(productId: number) {
    const cartItem = this.cart.find(item => item.product.id === productId);
    if (cartItem) {
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
        cartItem.product.inStock++;
      } else {
        this.removeFromCart(productId);
      }
      console.log('Cart after decreasing quantity:', this.cart);
    }
  }
}
