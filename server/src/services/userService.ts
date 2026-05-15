import bcrypt from 'bcryptjs';
import { supabase } from '../config/supabase';
import type { User, CreateUserDTO, UpdateUserDTO } from '../models/types';

const normalizeUser = (user: any): User => {
  const name = user.name || user.full_name || '';
  const avatar = user.avatar || user.avatar_url || '';

  return {
    ...user,
    name,
    full_name: name,
    avatar,
    avatar_url: avatar,
    role: user.role || 'Admin',
  };
};

const mapUserPayload = (user: CreateUserDTO | UpdateUserDTO) => {
  const mapped: Record<string, any> = {};

  const name = user.name || user.full_name;
  const avatar = user.avatar || user.avatar_url;

  if (name !== undefined) mapped.name = name;
  if (user.email !== undefined) mapped.email = user.email;
  if (avatar !== undefined) mapped.avatar = avatar;
  if (user.password !== undefined) mapped.password = user.password;

  return mapped;
};

export const userService = {
  async getAll(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, avatar, created_at')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return (data || []).map(normalizeUser);
  },

  async getById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, avatar, created_at')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data ? normalizeUser(data) : null;
  },

  async create(user: CreateUserDTO): Promise<User> {
    const payload = mapUserPayload(user);

    if (!payload.name || !payload.email) {
      throw new Error('Name and email are required');
    }

    // Hash password if provided
    const userData: Record<string, any> = { ...payload };
    if (typeof userData.password === 'string' && userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }

    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select('id, name, email, avatar, created_at')
      .single();

    if (error) throw new Error(error.message);
    return normalizeUser(data);
  },

  async update(id: string, user: UpdateUserDTO): Promise<User> {
    const payload: Record<string, any> = mapUserPayload(user);

    if (typeof payload.password === 'string' && payload.password) {
      const salt = await bcrypt.genSalt(10);
      payload.password = await bcrypt.hash(payload.password, salt);
    } else {
      delete payload.password;
    }

    const { data, error } = await supabase
      .from('users')
      .update(payload)
      .eq('id', id)
      .select('id, name, email, avatar, created_at')
      .single();

    if (error) throw new Error(error.message);
    return normalizeUser(data);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
};
