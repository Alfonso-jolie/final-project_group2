export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ValidationErrors {
  email?: string;
  password?: string;
}

export type UserRole = 'admin' | 'user'; 