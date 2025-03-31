import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogService } from '../Service/blog.service';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit{
  currentDate: string = '';
  blogs: any[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.hienThiNgay(); // Hiển thị ngày
    this.loadBlogData(); // Lấy dữ liệu blog từ service
  }

  hienThiNgay(): void {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    this.currentDate = `${day}/${month}/${year}`;
  }


  loadBlogData(): void {
    this.blogService.getBlog().subscribe((data: any[]) => {
      this.blogs = data;
    }, error => {
      console.error('Lỗi khi lấy dữ liệu:', error);
    });
  }
}

