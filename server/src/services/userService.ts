import bcrypt from 'bcryptjs';
import { supabase } from '../config/supabase';
import type { User, CreateUserDTO, UpdateUserDTO } from '../models/types';

export const userService = {
  async getAll(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, avatar, created_at')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  },

  async getById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, avatar, created_at')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async create(user: CreateUserDTO): Promise<User> {
    // Hash password if provided
    const userData = { ...user };
    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }

    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select('id, name, email, avatar, created_at')
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async update(id: string, user: UpdateUserDTO): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(user)
      .eq('id', id)
      .select('id, name, email, avatar, created_at')
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
};
