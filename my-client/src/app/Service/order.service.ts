import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Order, Product } from '../Interface/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private _url: string = "http://localhost:3000";

  constructor(private _http: HttpClient) { }

  createOrder(userId: number, orderData: any): Observable<Order> {
    const url = `${this._url}/orders/user/${userId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._http.post<Order>(url, orderData, { headers }).pipe(
      catchError((error) => {
        console.error('Error in createOrder:', error);
        return throwError(error);  // Chuyển lỗi để phía component xử lý
      })
    );
  }

  getOrder(userId: number): Observable<Order[]> {
    return this._http.get<Order[]>(`${this._url}/orders/user/${userId}`).pipe(
      retry(3),
      catchError(this.handleErr)
    );
  }

  

  handleErr(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }

  updateOrderStatus(userId: number, orderNumber: number, status: string): Observable<Order> {
    const updateData = { order_status: status };

    return this._http.patch<Order>(`${this._url}/orders/user/${userId}/${orderNumber}`, updateData).pipe(
      catchError(this.handleErr)
    );
  }

  updateProductFeedback(userId: number, orderNumber: number, productId: number, feedback: string): Observable<Product> {
    const updateData = { feedback };

    return this._http.patch<Product>(`${this._url}/orders/user/${userId}/${orderNumber}/products/${productId}`, updateData).pipe(
      catchError(this.handleErr)
    );
  }

}
