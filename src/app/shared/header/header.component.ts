import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  public avatarUrl = '';

  constructor(private readonly authService: AuthService) {
    this.avatarUrl = authService.user.avatarUrl;
  }

  ngOnInit(): void {}

  public getAvatar() {
    // console.log('🚀 getAvatar', this.headerService.avatar);
  }

  public logout() {
    this.authService.logout();
  }
}
