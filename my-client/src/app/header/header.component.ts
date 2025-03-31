import { CommonModule } from '@angular/common';
import {Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent{
  menuOpen = false;

  constructor(private authService: AuthService) {}

  toggleMenu(event: Event) {
    event.stopPropagation(); // Prevent event from bubbling to the document
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Close the menu if clicking outside the .dropdown-container or on the menu icon
    if (!target.closest('.dropdown-container') && this.menuOpen) {
      this.menuOpen = false;
    }
  }


  userLink(): string[] {
    const userId = this.authService.getUserId();
    return userId ? ['/account'] : ['/login'];
  }

  cartLink(): string[] {
    const userId = this.authService.getUserId();
    return userId ? ['/productcart'] : ['/login'];
  }


}
