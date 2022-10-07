import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];

  constructor(
    private sideBarService: SidebarService,
    private readonly authService: AuthService,
  ) { 
    this.menuItems = sideBarService.menu;
    console.log('menuItems', this.menuItems);
  }

  ngOnInit(): void {
  }

  public logout() {
    this.authService.logout();
  }

}
