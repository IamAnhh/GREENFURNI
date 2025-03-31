import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductCheckoutComponent } from './product-checkout/product-checkout.component';
// import { ProductReviewComponent } from './product-review/product-review.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PassworndAuthenticationComponent } from './passwornd-authentication/passwornd-authentication.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { FaqComponent } from './faq/faq.component';
import { PolicyComponent } from './policy/policy.component';
import { RequestedProductComponent } from './requested-product/requested-product.component';
import { AccountComponent } from './account/account.component';
import { SearchComponent } from './search/search.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, HomePageComponent, LoginComponent, SignUpComponent, PassworndAuthenticationComponent, ResetPasswordComponent, NewPasswordComponent,ProductCartComponent, ProductCheckoutComponent, ProductComponent, ProductListComponent, AboutUsComponent, BlogComponent, BlogDetailComponent, FaqComponent, PolicyComponent, RequestedProductComponent, AccountComponent, SearchComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-client';
}
