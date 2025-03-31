import { CommonModule } from "@angular/common";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CustomproductService } from '../Service/customproduct.service';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-requested-product',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './requested-product.component.html',
  styleUrls: ['./requested-product.component.css']
})
export class RequestedProductComponent{
  formData = {
    name: '',
    email: '',
    phone: '',
    productName: '',
    description: '',
  };
  isPopupVisible = false;

  constructor(private customProductService: CustomproductService) {}

  // Gửi form dữ liệu lên server
  onSubmit(): void {
    if (this.validateForm()) {
      // Gửi formData mà không cần file
      this.customProductService.submitForm(this.formData).subscribe({
        next: (response) => {
          console.log('Form submitted successfully:', response);

          console.log('duwx lieeuj Formdata: ' + this.formData);
        },
        error: (err) => {
          // console.error('Error submitting form:', err);
          this.showPopup();
          this.resetForm();
        },
      });
    } else {
      alert('Vui lòng điền đầy đủ thông tin vào form!');
    }
  }

  // Hiển thị popup thành công
  showPopup(): void {
    this.isPopupVisible = true;
  }

  // Đóng popup
  closePopup(): void {
    this.isPopupVisible = false;
  }

  // Reset form sau khi gửi thành công
  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      productName: '',
      description: '',
    };
  }

  // Validate các trường trong form
  validateForm(): boolean {
    return (
      this.formData.name.trim() !== '' &&
      this.formData.email.trim() !== '' &&
      this.formData.phone.trim() !== '' &&
      this.formData.productName.trim() !== '' &&
      this.formData.description.trim() !== ''
    );
  }
}
