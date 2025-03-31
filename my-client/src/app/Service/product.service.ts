import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { product } from '../Interface/product';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  _url: string = "http://localhost:3000/product";
  private cartItems: any[] = []; // Duy trì thông tin giỏ hàng

  
  constructor(private _http: HttpClient,
    private authService: AuthService, // Inject AuthService
    private router: Router) { }

  apiUrl:  string = "http://localhost:3000";
  
  getProduct(id: number): Observable<product> {
    const url = `${this.apiUrl}/product/${id}`;
    return this._http.get<product>(url);
  }



  private searchResultsSubject = new BehaviorSubject<any[]>([]);
  public searchResults$: Observable<any[]> = this.searchResultsSubject.asObservable();

  updateSearchResults(results: any[]): void {
    this.searchResultsSubject.next(results);
  }

  handleError(handleError: any): import("rxjs").OperatorFunction<product[], any> {
    throw new Error('Method not implemented.');
  }


  getData(): Observable<product[]> {
    return this._http.get<product[]>(this._url);
  }

  getProductById(id: any): Observable<product | undefined> {
    return this._http.get<product[]>(this._url).pipe(
      map((products: any[]) => {
        const product = products.find((productt: product) => productt._id === id);
        console.log('Product:', product);
        return product ?? undefined;
      })
    );
  }

  getDataByCategory(category: string): Observable<product[]> {
    const url = `${this.apiUrl}/products/${category}`;
    return this._http.get<product[]>(url);
  }
  getDataByPrice(price: string): Observable<product[]> {
    const url = `${this.apiUrl}/products/${price}`;
    return this._http.get<product[]>(url);
  }

  updateProduct(updatedProduct: any): Observable<any> {
    const url = `${this.apiUrl}/${updatedProduct.id}`;
    return this._http.patch(url, updatedProduct);
  }

}
