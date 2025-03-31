import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Service/product.service';
import { BlogService } from '../Service/blog.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent  implements OnInit  {
  products: any[] = [];
  faqQuestions = [
    { question: 'Làm thế nào để gửi sản phẩm cần bảo hành cho GreenFurni?', answer: 'Liên hệ với bộ phận hỗ trợ để được hướng dẫn chi tiết.' },
    { question: 'Sản phẩm sau mua có được đổi trả không?', answer: 'Sản phẩm có thể đổi trả trong vòng 7 ngày.'},
    { question: 'Sản phẩm được bảo hành như thế nào?', answer: 'Chúng tôi cung cấp bảo hành 12 tháng cho tất cả sản phẩm.' }
  ];
  blogs: any[] = [];
  // Lưu chỉ số của câu hỏi đang được chọn
  selectedQuestion: number | null = null;

  // Hàm toggle để hiển thị hoặc ẩn câu trả lời
  toggleAnswer(index: number): void {
    this.selectedQuestion = this.selectedQuestion === index ? null : index;
  }

  constructor(private productService: ProductService, private blogService: BlogService) {}

  ngOnInit(): void {
    this.productService.getData().subscribe((data) => {
      this.products = data;
    });
    this.loadBlogData();  // Tải dữ liệu blog khi trang được khởi tạo
  }

  loadBlogData(): void {
    this.blogService.getBlog().subscribe((data: any[]) => {
      this.blogs = data; // Gán dữ liệu lấy được cho biến blogs
    }, error => {
      console.error('Lỗi khi lấy dữ liệu:', error);
    });
  }

}
