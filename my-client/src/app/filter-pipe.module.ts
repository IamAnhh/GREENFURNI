import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [FilterPipe],
  imports: [CommonModule],  // Nếu có các module khác cần thiết
  exports: [FilterPipe]  // Xuất FilterPipe để có thể sử dụng trong các component khác
})
export class FilterPipeModule {}