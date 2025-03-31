import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Mail: string= '';
  password: string= '';
  isMailValid: boolean = true;


  constructor(
    private authService: AuthService,
    private router:Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    ) {}

  checkMail(): void {
    const MailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Kiểm tra chuỗi đã nhập là địa chỉ email hợp lệ không?
    this.isMailValid = MailRegex.test(this.Mail);
  }  

  ngOnInit(){
          // Nếu cookie "phonenumber" và "password" đã tồn tại thì sử dụng lại thông tin đăng nhập
          const Mail = this.authService.getCookie('Mail');
          const password = this.authService.getCookie('password');
          if (Mail && password) {
            this.Mail = Mail;
            this.password = password;
          }
  }

  onSubmit() {
    if (!this.isMailValid) {
      alert('Vui lòng nhập đúng Email!');
      return false;
    } else {
      this.authService.login(this.Mail, this.password).subscribe(
        (user) => {
          if (user && user.userid) {
            // Lưu userid vào sessionStorage
            this.authService.saveUserIdToSessionStorage(user.userid);

            // Lưu thông tin người dùng vào sessionStorage
            this.authService.setCurrentUser(user);

            // Lưu cookie nếu checkbox "Remember me" được chọn
            alert('Đăng nhập thành công!');
            
            // Chuyển hướng người dùng đến trang chính
            this.router.navigate(['/home-page'], { relativeTo: this.route });
          } else {
            // Xử lý khi đăng nhập không thành công
            console.error('Đăng nhập không thành công');
          }
        },
        (error) => {
          // Xử lý khi có lỗi trong quá trình đăng nhập
          alert('Vui lòng kiểm tra lại mật khẩu hoặc email!');
        }
      );
      return false;
    }
  }
  navigateToForgotPass(): void {
    // Chuyển hướng đến trang forgot-pass khi người dùng bấm "Quên mật khẩu?"
    this.router.navigate(['/forgot-pass']);
  }

  navigateToSignup(): void {
    this.router.navigate(['/sign-up']);
  }

}
