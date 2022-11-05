import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user.model';
import { UploadImagesService } from 'src/app/shared/upload-images.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  public roles = ['admin', 'manager'];
  public user: User;
  public profileForm: FormGroup;
  public avatarToUpload: File;
  public imgTemp: string | ArrayBuffer = null;

  constructor(
    private readonly authService: AuthService,
    private readonly uploadImagesService: UploadImagesService
  ) {
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    this.userFormGroup();
  }

  userFormGroup() {
    this.profileForm = new FormGroup({
      name: new FormControl(this.user.name),
      email: new FormControl(this.user.email, [Validators.email]),
      phoneNumber: new FormControl(this.user.phoneNumber, [
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
      adress: new FormControl('456456', Validators.required),
      role: new FormControl(''),
    });
  }

  updateProfile() {
    this.authService.updateProfile(this.profileForm.value).subscribe({
      next: () => {
        const { name, email, phoneNumber, password, adress } =
          this.profileForm.value;
        (this.user.name = name),
          (this.user.email = email),
          (this.user.phoneNumber = phoneNumber),
          (this.user.password = password),
          (this.user.adress = adress);
        Swal.fire('Actualizado', '', 'success');
      },
      error: (error) => Swal.fire('Error', error.error.message, 'error'),
    });
  }

  updateAvatar(file: File) {
    this.avatarToUpload = file;
    if (!file) {
      return (this.imgTemp = null);
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  uploadAvatar() {
    this.uploadImagesService
      .uploadImages(this.avatarToUpload, 'user', this.user.id)
      .subscribe({
        next: (res: User) => {
          this.user.avatar = res.avatar;
          Swal.fire('Avatar Actualizado', '', 'success');
        },
      });
  }
}
