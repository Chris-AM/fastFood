import { environment } from '../../environments/environment.electron';

const base_url = environment.base_url;

export class User {
  constructor(
    public name: string,
    public email: string,
    public adress?: string,
    public phoneNumber?: number,
    public password?: string,
    public id?: string,
    public role?: string[],
    public phoneCode?: string,
    public google?: boolean,
    public facebook?: boolean,
    public avatar?: string
  ) {}

  get avatarUrl() {
    if (this.avatar) {
      const url = `${base_url}/user/avatar/${this.avatar}`;
      return url;
    } else {
      return 'https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg';
    }
  }
}
