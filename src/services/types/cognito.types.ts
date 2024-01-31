export interface registerUser {
  email: string;
  password: string;
  name: string;
}

export interface confirmRegisterUser {
  email: string;
  otp: string;
}

export interface loginUser {
  email: string;
  password: string;
}
