export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  created_at: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password?: string;
  avatar?: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  type: string;
  info?: string;
  image_url?: string;
  created_at: string;
}

export interface CreateProductDTO {
  name: string;
  type: string;
  info?: string;
  image_url?: string;
}

export interface UpdateProductDTO {
  name?: string;
  type?: string;
  info?: string;
  image_url?: string;
}
