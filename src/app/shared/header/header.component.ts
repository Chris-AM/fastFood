import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  public user: User;

  constructor(private readonly authService: AuthService) {
    this.user = this.authService.user;
  }

  ngOnInit(): void {}

  public logout() {
    this.authService.logout();
  }
}
