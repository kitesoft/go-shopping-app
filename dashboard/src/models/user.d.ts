export interface User {
  id?: number|null;
  first_name: string;
  last_name: string;
  email: string;
};

export interface AuthUser{
  password: string;
  confirm_password: string;
}
