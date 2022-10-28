import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  public avatarUrl = '';
  public menuItems: any[];

  constructor(
    private sideBarService: SidebarService,
    private readonly authService: AuthService
  ) {
    this.avatarUrl = authService.user.avatarUrl;
    this.menuItems = sideBarService.menu;
  }

  ngOnInit(): void {}

  public logout() {
    this.authService.logout();
  }
}
