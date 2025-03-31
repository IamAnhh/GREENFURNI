import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AccountCustomer } from '../Interface/AccountCustomer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  saveUserIdToSessionStorage(userid: number): void {
    sessionStorage.setItem('userid', userid.toString());
  }

  login(Mail: string, password: string): Observable<AccountCustomer> {
    const url = 'http://localhost:3000/login';
    const data = { Mail, password };

    return this.http.post<AccountCustomer>(url, data).pipe(
      tap(user => {
        console.log('User from server:', user);
        console.log('user', user.Name);
    
        if (user && user.userid) {
          this.saveUserIdToSessionStorage(user.userid);
          this.setCurrentUser(user);
          console.log('Login successful');
        } else {
          console.error('Login unsuccessful. User or userid is null.');
          // console.log('user:', user);
        }
      }),
    );
    
  }

  // Add a new method to get userid from sessionStorage
  getUserId(): string | null {
    return sessionStorage.getItem('userid');
  }

  getUserIdNumber(): number | null {
    const userIdString = sessionStorage.getItem('userid');
    if (userIdString) {
      const userIdNumber = parseInt(userIdString, 10);
      return userIdNumber;
    } else {
      return null;
    }
  }
  

  logout() {
    sessionStorage.removeItem('CurrentUser');
  }

  setCurrentUser(user: any) {
    if (user) {
      sessionStorage.setItem('CurrentUser', JSON.stringify(user));
    } else {
      console.error('Trying to set null user.');
    }
  }
  
  getCurrentUser() {
    const userString = sessionStorage.getItem('CurrentUser');
    if (userString) {
      return JSON.parse(userString);
    } else {
      console.error('No user found in sessionStorage.');
      return null; // or handle the absence of user in a way that makes sense for your application
    }
  }
  
  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  public setCookie(name: string, value: string, expireDays: number): void {
    const date = new Date();
    date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
  }

  public getCookie(name: string): string {
    const cookieName = name + '=';
    const cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  }

  public deleteCookie(name: string): void {
    this.setCookie(name, '', -1);
  }

  // Lưu email tạm thời từ forgotpass
  temporaryMail: string = '';

  setTemporaryMail(Mail: string): void {
    this.temporaryMail = Mail;
  }

  getTemporaryEmail(): string {
    return this.temporaryMail;
  }

  private apiUrl = 'http://localhost:3000'; // Đặt URL của API của bạn ở đây

  async updatePassword(Mail: string, newPassword: string): Promise<any> {
    const url = `${this.apiUrl}/update-password`;
    const data = { Mail, newPassword };
  
    try {
      const response = await this.http.put<any>(url, data).toPromise(); // Thêm .toPromise()
  
      // Kiểm tra cấu trúc thực tế của phản hồi
      if (response && response.message) {
        return response.message;
      } else {
        // Điều chỉnh phần này dựa trên cấu trúc thực tế của phản hồi
        return 'Cập nhật mật khẩu thành công'; // Hoặc xử lý khác tùy ý
      }
    } catch (error) {
      // Xử lý lỗi một cách phù hợp
      console.error('Lỗi khi cập nhật mật khẩu:', error);
      throw error; // Ném lại lỗi nếu cần
    }
  }
}
