import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DailySalesComponent } from './daily-sales/daily-sales.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';
import { PagesComponent } from './pages.component';
import { ProductComponent } from './product/product.component';
import { UsersComponent } from './users/users.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      {
        path: 'daily-sales',
        component: DailySalesComponent,
        data: { title: 'ventas diarias' },
      },
      {
        path: 'ingredients',
        component: IngredientComponent,
        data: { title: 'ingredientes' },
      },
      { path: 'menus', component: MenuComponent, data: { title: 'menus' } },
      { path: 'orders', component: OrderComponent, data: { title: 'pedidos' } },
      {
        path: 'products',
        component: ProductComponent,
        data: { title: 'productos' },
      },
      { path: 'users', component: UsersComponent, data: { title: 'usuarios' } },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { title: 'configuaraciones' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
