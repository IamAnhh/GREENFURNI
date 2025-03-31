import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PassworndAuthenticationComponent } from './passwornd-authentication/passwornd-authentication.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductCheckoutComponent } from './product-checkout/product-checkout.component';
import { BlogComponent } from './blog/blog.component';
import { FaqComponent } from './faq/faq.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PolicyComponent } from './policy/policy.component';
import { RequestedProductComponent } from './requested-product/requested-product.component';
import { AccountComponent } from './account/account.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    {path: 'home-page', component:HomePageComponent},
    {path: 'sign-up', component:SignUpComponent},
    {path: 'login', component: LoginComponent},
    {path: 'forgot-pass', component: ResetPasswordComponent},
    {path: 'password-authentication', component: PassworndAuthenticationComponent},
    {path: 'new-password', component: NewPasswordComponent},
    {path: 'product/:id', component: ProductComponent},
    {path: 'productlist', component: ProductListComponent},
    {path: 'productcart', component: ProductCartComponent},
    {path: 'productcheckout', component: ProductCheckoutComponent},
    { path: 'blog', component: BlogComponent },
    { path: 'blog/:id', component: BlogDetailComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'aboutus', component: AboutUsComponent },
    { path: 'policy', component: PolicyComponent },
    { path: 'customproduct', component: RequestedProductComponent },
    {path: 'account', component: AccountComponent},
    {path: 'search', component: SearchComponent},
    { path: '', redirectTo: '/home-page', pathMatch: 'full' }, // Trang mặc định

];
