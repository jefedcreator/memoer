export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface ISignIn {
  name: string;
  email: string;
  password: string;
}

export interface IChangePassword {
  email: string;
  newPassword: string;
  oldPassword: string;
}
