export interface User {
  [prop: string]: any;

  id: number | string | null;
  name?: string;
  email?: string;
  avatar?: string;
}

export interface Token {
  [prop: string]: any;

  access_token: string;
  token_type: string;
  expires_in?: number;
  exp?: number;
  refresh_token?: string;
}

export interface ResultVo<T> {
  [prop: string]: any;

  code: string;
  data: T;
  message: string;
}
