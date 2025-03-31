export interface BlogPost {
    _id: string;
    id: string;  
    title: string;
    author: string;
    date: string; // Bạn có thể sử dụng kiểu Date nếu lưu ngày làm việc với JavaScript Date Object
    thumbnail: string; // Đường dẫn đến hình ảnh thumbnail
    content: string;
  }