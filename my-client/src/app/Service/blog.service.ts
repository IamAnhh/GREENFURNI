import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../Interface/Blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

// gọi API hiển thị toàn bộ blog
  getBlog(): Observable<any> {
    return this.http.get<any>(this.apiUrl +'/blog');
  }

  // gọi API hiển thị bài viết chi tiết theo Id
  getBlogById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/blog/${id}`);
  }

  getAllBlogs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+ '/blog')
  }
}
