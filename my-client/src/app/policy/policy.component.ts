import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent], 
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent {
  selectedOption: string = 'banHang';  

  setSelectedOption(option: string): void {
    this.selectedOption = option;
  }

}
