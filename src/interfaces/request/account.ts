export interface IFormCreateAccount {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
}

export interface ILogin {
  password: string;
  email: string;
}
export interface IForgotPassword {
  email: string;
}
export interface IResetPassword {
  email: string | undefined;
  confirmationCode: string;
  newPassword: string;
}
export interface IRegister {
  username: string;
  password: string;
  email: string;
}
export interface IRegisterEmployer {
  address: string;
  companyName: string;
  password: string;
  email: string;
}
export interface ICreateAccount {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
}

export interface IChangeAccount {
  email: string;
  password: string;
  displayName: string;
  image?: any;
}
