import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AccountCustomer } from '../Interface/AccountCustomer';
import { AccountcustomerService } from '../Service/accountcustomer.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  account = new AccountCustomer();
  errMessage: string = '';
  constructor(
    private _service: AccountcustomerService,
    private router: Router,
    private accountService: AccountcustomerService
  ) {}
  public setAccount(a: AccountCustomer) {
    this.account = a;
  }

  isPhoneNumberValid: boolean = true;
  phoneNumberExist = true;
  phoneNumbers: any;

  checkPhoneNumber(): void {
    const phoneNumberRegex = /^(\+84|0)[1-9][0-9]{7,8}$/;
    if (this.account.phonenumber.trim().length === 0) {
      this.isPhoneNumberValid = true;
    } else {
      this.isPhoneNumberValid = phoneNumberRegex.test(this.account.phonenumber);
    }
  }

  isValidEmail: boolean = true;
  checkMail() {
    const MailRegex = /\S+@\S+\.\S+/;
    if (this.account.Mail.trim().length === 0) {
      this.isValidEmail = true;
    } else {
      this.isValidEmail = MailRegex.test(this.account.Mail);
    }
  }

  isValidPassword: boolean = true;
  checkPassword(): void {
    // Kiểm tra mật khẩu có ít nhất 6 ký tự, chứa ít nhất một chữ cái, một số và một ký tự đặc biệt
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (this.account.password.trim().length === 0) {
      this.isValidPassword = true;
      alert('Vui lòng nhập mật khẩu!');
    } else if (!passwordRegex.test(this.account.password)) {
      alert(
        'Mật khẩu phải có ít nhất 6 ký tự, chứa ít nhất một chữ cái, một số và một ký tự đặc biệt!'
      );
    }
  }

  postAccount() {
    this.checkPhoneNumber();
    this.checkMail();
    this.checkPassword();
  
    if (!this.isPhoneNumberValid) {
      alert('Vui lòng nhập đúng số điện thoại!');
      return;
    }
    if (!this.isValidEmail) {
      alert('Vui lòng nhập đúng email!');
      return;
    }
    if (!this.isValidPassword) {
      alert(
        'Mật khẩu phải có ít nhất 6 ký tự, chứa ít nhất một chữ cái, một số và một ký tự đặc biệt!'
      );
      return;
    }
    if (
      !this.account.phonenumber ||
      this.account.phonenumber.trim().length === 0 ||
      !this.account.Name ||
      this.account.Name.trim().length === 0 ||
      !this.account.password ||
      this.account.password.trim().length === 0
    ) {
      alert('Vui lòng nhập đủ thông tin bắt buộc');
      return;
    }
    this.accountService.postAccount(this.account).subscribe({
      next: (data) => {
        this.account = data;
        this.router.navigate(['/login']);
        alert('Đăng ký thành công');
      },
      error: (err) => {
        this.errMessage = err;
        alert('Đăng ký không thành công');
      },
    });
  }
  
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
