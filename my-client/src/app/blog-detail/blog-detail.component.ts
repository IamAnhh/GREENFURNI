import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService } from '../Service/blog.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
// import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent implements OnInit {
  blogData: any; // Dữ liệu bài blog chi tiết
  relatedBlogs: any[] = []; // Danh sách bài viết khác

  constructor(
    private route: ActivatedRoute, // Lấy thông tin tham số từ URL
    private blogService: BlogService // Gọi các API liên quan đến blog
  ) {}

  ngOnInit(): void {
    // Theo dõi sự thay đổi của tham số `id` từ URL
    this.route.paramMap.subscribe((paramMap) => {
      const blogId = paramMap.get('id'); // Lấy ID của bài blog
      if (blogId) {
        this.fetchBlogDetail(blogId); // Lấy chi tiết bài viết
        this.loadRelatedBlogs(blogId); // Tải bài viết liên quan
      }
    });
  }

  /**
   * Hàm lấy chi tiết bài blog
   * @param blogId ID của bài viết hiện tại
   */
  fetchBlogDetail(blogId: string): void {
    this.blogService.getBlogById(blogId).subscribe(
      (data) => {
        this.blogData = data; // Gán dữ liệu chi tiết bài viết
      },
      (error) => {
        console.error('Lỗi khi tải chi tiết blog:', error);
      }
    );
  }

  /**
   * Hàm tải danh sách bài viết không trùng với bài hiện tại
   * @param currentBlogId ID của bài viết hiện tại
   */
  loadRelatedBlogs(currentBlogId: string): void {
    this.blogService.getAllBlogs().subscribe(
      (blogs) => {
        // Lọc danh sách các bài viết, loại trừ bài viết hiện tại
        this.relatedBlogs = blogs.filter(
          (blog: any) => blog._id !== currentBlogId
        );
      },
      (error) => {
        console.error('Lỗi khi tải danh sách bài viết:', error);
      }
    );
  }
}
