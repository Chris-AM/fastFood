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
}
