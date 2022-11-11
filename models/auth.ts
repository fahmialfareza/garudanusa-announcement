// Request
export interface IRegisterRequest {
  name: string;
  username: string;
  password: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

// Response
export interface IRegisterLoginResponse {
  status: string;
  data: {
    token: string;
  };
  message: string;
}

export interface IMeResponse {
  status: string;
  data: IUser;
  message: string;
}

export interface IAllUsersResponse {
  status: string;
  data: IUser[];
  message: string;
}

// Model
export interface IUser {
  id: number;
  name: string;
  username: string;
  number: number;
}
