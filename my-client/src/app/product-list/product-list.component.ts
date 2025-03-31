import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../Service/product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { product } from '../Interface/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  product: any = [];
  errMsg: string = "";
  
  selectedCategory: string = "";
  selectedPriceRange: string = "";
  
  constructor(
    private productService: ProductService, 
    private _router: Router, 
    private _activatedRoute: ActivatedRoute,  
    private cdr: ChangeDetectorRef
  ) {}
  
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
  
  // Clear filters when switching categories
  clearCategoryFilters() {
    this.selectedCategory = "";
  }
  
  // Clear filters when switching price ranges
  clearPriceFilters() {
    this.selectedPriceRange = "";
  }
  
  // Handle checkbox change for category or price
  onCheckboxChange(type: string, value: string) {
    if (type === 'category') {
      this.clearCategoryFilters();
      this.selectedCategory = value;
    } else if (type === 'price') {
      this.clearPriceFilters();
      this.selectedPriceRange = value;
    }
  
    if (!this.selectedCategory && !this.selectedPriceRange) {
      this.loadAllProducts();
    } else if (this.selectedCategory) {
      this.productService.getDataByCategory(this.selectedCategory).subscribe(
        (data) => {
          this.product = data;
        },
        (error) => {
          console.error('Error fetching category data:', error);
        }
      );
    } else if (this.selectedPriceRange) {
      this.productService.getDataByPrice(this.selectedPriceRange).subscribe(
        (data) => {
          this.product = data;
        },
        (error) => {
          console.error('Error fetching price range data:', error);
        }
      );
    }
  }

  resetFilters() {
    // Reset selectedCategory và selectedPriceRange về giá trị mặc định
    this.selectedCategory = "";
    this.selectedPriceRange = "";
  
    // Tải lại tất cả sản phẩm
    this.loadAllProducts();
  }
  
}
