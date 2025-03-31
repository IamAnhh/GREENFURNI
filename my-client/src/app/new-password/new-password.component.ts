import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent {
  password: string='';
  confirmPassword: string= '';

  @ViewChild('passwordInput') passwordInput: any;
  @ViewChild('confirmPasswordInput') confirmPasswordInput: any;

  constructor(private AuthService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Lấy giá trị temporaryMail từ AuthService
    const Mail = this.AuthService.getCurrentUser();
    console.log('Temporary Mail:', Mail.Mail);
    // console.log('Temporary Mail:', Mail); 
  }

  onChecked() {
    const passwordInput = this.passwordInput.nativeElement;
    if (this.password.trim().length === 0) {
    this.passwordInput.value = true;
    return;
  }
  }

  checkPasswordsMatch() {

    const passwordInput = this.passwordInput.nativeElement;
    const confirmPasswordInput = this.confirmPasswordInput.nativeElement;
    
    if (this.confirmPassword.trim().length === passwordInput.value) {
      this.confirmPasswordInput.value = true;;
      alert('Đổi mật khẩu thành công');
      this.router.navigate(['/login']);

    } else
    if (passwordInput.value !== confirmPasswordInput.value) {
      alert('Mật khẩu không khớp. Vui lòng nhập lại mật khẩu.');
    }
  }

  isPasswordValid(password: string): boolean {
    // Thêm các điều kiện kiểm tra tính hợp lệ của mật khẩu ở đây
    // Ví dụ: ít nhất 6 ký tự, chứa ít nhất một chữ cái và một số.
    return /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password);
  }

  async updatePassword() {
    // console.log(this.password)
    // Kiểm tra mật khẩu mới có hợp lệ không
    if (this.isPasswordValid(this.password)) {
      // const Mail = this.AuthService.temporaryMail;

      // Gọi service để cập nhật mật khẩu trong cơ sở dữ liệu
      const response = this.AuthService.updatePassword(this.AuthService.getCurrentUser().Mail, this.password)
      alert('Đổi mật khẩu thành công');
      this.router.navigate(['/login']);
    } else {
      alert('Đổi mật khẩu không thành công');
    }
  }

}
