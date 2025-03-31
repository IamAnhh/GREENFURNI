import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AccountcustomerService } from '../Service/accountcustomer.service';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  Mail: string = '';
  Mails: any;
  isMailValid: boolean = true;
  MailExist = true;
  MailData: string = '';
  errorMessage: string = '';
  verificationCode: string = '';
  isVerificationCodeValid: boolean = true;
  generatedOtp: string = '';

  constructor(
    private router: Router,
    private accountService: AccountcustomerService,
    private AuthService: AuthService
  ) {}

  ngOnInit(): void {}

  sendCode() {
    // Kiểm tra định dạng email trước khi gửi mã OTP
    this.checkMail();

    if (!this.isMailValid) {
      // alert('Vui lòng nhập đúng Email!');
    } else if (this.Mail.trim().length === 0) {
      alert('Vui lòng nhập Email!');
    } else {
      this.accountService.checkMailExist(this.Mail).subscribe({
        next: (data) => {
          this.Mails = data;
          if (this.Mails.Mail == this.Mail) {
            // Email tồn tại, gửi mã OTP
            this.verificationCode = this.generateRandomOtp();
            this.generatedOtp = this.verificationCode;
            alert(
              'Mã OTP đã được gửi đến email của bạn.\nMã OTP: ' +
                this.generatedOtp
            );
            // Lưu thông tin người dùng vào sessionStorage
            const user = {
              Mail: this.Mails.Mail,
              // Các thông tin khác nếu có
            };
            this.AuthService.setCurrentUser(user);

            console.log('this.Mails:', this.Mails);
            console.log('this.generatedOtp:', this.generatedOtp);
            this.updateData()
            setTimeout(() => {
              this.navigateToOTP(); // Gọi navigateToOTP sau khi người dùng bấm OK
            }, 100); // Trì hoãn một chút để đảm bảo hàm sendCode đã hoàn tất
          }
        },
        error: (err) => {
          this.errorMessage = err;
          alert('Email không tồn tại!');
        },
      });
    }
  }


  //-----FE
  checkMail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (this.Mail.trim().length === 0) {
      // Trường email trống, xem như là hợp lệ
      this.isMailValid = true;
    } else {
      // Kiểm tra định dạng của địa chỉ email
      this.isMailValid = emailRegex.test(this.Mail);
    }
  }

  generateRandomOtp(): string {
    // Tạo mã OTP ngẫu nhiên có 5 chữ số
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  navigateToOTP(): void {
    // Chuyển hướng đến trang forgot-pass khi người dùng bấm "Quên mật khẩu?"
    this.router.navigate(['/password-authentication']);
  }

  updateData() {
    this.accountService.updateData(this.generatedOtp); // Cập nhật dữ liệu
  }

}
