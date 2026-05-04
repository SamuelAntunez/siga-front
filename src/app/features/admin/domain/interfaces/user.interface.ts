export interface User {
  id: string;
  name: string;
  email: string;
  emailValidate: boolean;
  role: string[];
  displayRoles?: string[];
  img?: string;
}

export interface PaginatedUsersResponse {
  page: number;
  limit: number;
  total: number;
  next: string | null;
  prev: string | null;
  users: User[];
}

export interface RegisterUserDto {
  name: string;
  email: string;
  password?: string;
  role?: string[];
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface UpdateUserResponse {
  message: string;
}

export interface ErrorResponse {
  error?: string;
  message?: string;
}
