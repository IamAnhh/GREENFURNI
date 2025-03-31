import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Service/product.service';
import { product } from '../Interface/product';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipeModule } from '../filter-pipe.module';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FilterPipeModule, FooterComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  product: any = [];
  search: any;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadAllProducts();
  }
  
  // Load all products when no filters are selected
  loadAllProducts() {
    this.productService.getData().subscribe(
      (data: product[]) => {
        this.product = data;
      },
      (error) => {
        console.error('Error fetching all data:', error);
      }
    );
  }
}
