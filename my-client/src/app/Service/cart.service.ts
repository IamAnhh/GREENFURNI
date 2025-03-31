import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Cart } from '../Interface/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  initCartLocalStorage() {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCart(userid: string): Observable<Cart> {
    const url = `${this.apiUrl}/cart/${userid}`;
    return this.http.get<Cart>(url);
  }

  // Update số lượng sản phẩm trong giỏ hàng
  updateCartItemQuantity(
    userId: number,
    itemId: number,
    quantity: number
  ): Observable<any> {
    const url = `${this.apiUrl}/cart/update-quantity/${userId}/${itemId}`;
    const payload = { quantity: quantity };

    return this.http.put(url, payload);
  }
  // Phương thức để xóa sản phẩm khỏi giỏ hàng
  removeCartItem(userId: number, itemId: number): Observable<any> {
    const url = `${this.apiUrl}/cart/remove/${userId}/${itemId}`;
    return this.http.delete(url);
  }
  // Hàm thêm sản phẩm vào giỏ hàng
  addToCart(
    userId: number,
    productId: number,
    quantity: number
  ): Observable<any> {
    const url = `${this.apiUrl}/cart/add`;

    const payload = {
      userid: userId,
      productId: productId,
      quantity: quantity,
    };

    return this.http.post(url, payload);
  }
}
