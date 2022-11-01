import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  public profileForm = new FormGroup({
    name: new FormControl('Chris', [Validators.required]),
    email: new FormControl('c.aranguizm@outlook.com', [Validators.email]),
    phoneNumber: new FormControl('63357624', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(8),
      Validators.maxLength(8),
    ]),
    password: new FormControl('1704', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16),
    ]),
    confirmPassword: new FormControl('1704', [Validators.required]),
    remember: new FormControl(false),
  });

  constructor() {}

  ngOnInit(): void {}

  updateProfile() {
    console.log('🚀 user updated', this.profileForm.value);
  }
}
