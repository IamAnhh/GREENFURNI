import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AccountcustomerService } from '../Service/accountcustomer.service';
import { AuthService } from '../Service/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-passwornd-authentication',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './passwornd-authentication.component.html',
  styleUrl: './passwornd-authentication.component.css',
})
export class PassworndAuthenticationComponent implements OnInit {
  data: string = '';
  Mail: string = '';
  Mails: any;
  isMailValid: boolean = true;
  generatedOtp: string = '';
  errorMessage: string = '';
  verificationCode: boolean = false;
  isVerificationCodeValid: boolean = true;
  otp1: string = '';
  otp2: string = '';
  otp3: string = '';
  otp4: string = '';
  otp5: string = '';
  otp: string = '';

  constructor(
    private router: Router,
    private accountService: AccountcustomerService,
    private AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.accountService.data$.subscribe((data) => {
      this.data = data;
    });
  }

  getOtp() {
    // Kiểm tra xem tất cả các input đã được nhập hay chưa
    if (this.otp1 && this.otp2 && this.otp3 && this.otp4) {
      // Ghép các giá trị thành một chuỗi OTP từ các input của người dùng
      const otp = this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5;

      // Kiểm tra xem OTP người dùng nhập có khớp với OTP trong data không
      if (this.data === otp) {
        this.verificationCode = true; // OTP đúng
        // alert('Mã xác nhận chính xác!');
      } else if (this.generatedOtp === otp) {
        this.verificationCode = true;
      } else {
        this.verificationCode = false; // OTP sai
        alert('Mã xác nhận không đúng. Vui lòng nhập lại!');
      }
    } else {
      alert('Vui lòng nhập đầy đủ OTP.');
      this.verificationCode = false; // Nếu thiếu OTP
    }
  }

  resend() {
    // Gửi lại mã OTP mới
    this.generatedOtp = this.generateRandomOtp(); // Cập nhật giá trị OTP mới
    alert('Đã gửi lại mã xác nhận!');
    alert(
      'Mã OTP mới đã được gửi đến email của bạn.\nMã OTP mới: ' +
        this.generatedOtp
    );
  }

  generateRandomOtp(): string {
    // Tạo mã OTP ngẫu nhiên có 5 chữ số
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  onSubmit() {
    this.getOtp();
    // Kiểm tra nếu mã xác nhận hợp lệ (verificationCode = true)
    if (this.verificationCode) {
      this.router.navigate(['/new-password']);
    }

    return;
  }
}
