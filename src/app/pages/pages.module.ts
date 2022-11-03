//node_modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';

//own_modules
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

//components
import { IngredientComponent } from './ingredient/ingredient.component';
import { ProductComponent } from './product/product.component';
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';
import { DailySalesComponent } from './daily-sales/daily-sales.component';
import { UsersComponent } from './users/users.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestComponent } from './hidden/test.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [
    IngredientComponent,
    ProductComponent,
    MenuComponent,
    OrderComponent,
    DailySalesComponent,
    UsersComponent,
    PagesComponent,
    DashboardComponent,
    TestComponent,
    AccountSettingsComponent,
    UserProfileComponent,
  ],
  exports: [
    IngredientComponent,
    ProductComponent,
    MenuComponent,
    OrderComponent,
    DailySalesComponent,
    UsersComponent,
    PagesComponent,
    DashboardComponent,
    AccountSettingsComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ComponentsModule,
    NgChartsModule,
    HttpClientModule,
    AuthModule
  ],
})
export class PagesModule {}
