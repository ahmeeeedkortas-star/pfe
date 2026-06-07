import { db } from '../db/database';
import type { User, UserRole } from '../types';

const SESSION_KEY = 'qhse_doc_session';

export async function ensureUsersSeeded(): Promise<void> {
  const count = await db.users.count();
  if (count > 0) return;

  const roles: UserRole[] = ['Opérateur', 'Qualité', 'Ingénieur', 'Direction'];
  await db.users.bulkAdd(
    roles.map((role, i) => ({
      id: `user-${i + 1}`,
      login: role.toLowerCase().replace('é', 'e').replace(' ', ''),
      displayName: role,
      role,
      password: 'demo',
    }))
  );
}

export async function login(loginId: string, password: string): Promise<User | null> {
  await ensureUsersSeeded();
  const user = await db.users.where('login').equals(loginId).first();
  if (!user || user.password !== password) return null;
  localStorage.setItem(SESSION_KEY, user.id);
  return user;
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

export async function getCurrentUser(): Promise<User | null> {
  const id = localStorage.getItem(SESSION_KEY);
  if (!id) return null;
  return (await db.users.get(id)) ?? null;
}

export function canCreate(user: User | null): boolean {
  return user?.role === 'Ingénieur' || user?.role === 'Direction';
}

export function canEditDraft(user: User | null): boolean {
  return canCreate(user);
}

export function canValidateQhse(user: User | null): boolean {
  return user?.role === 'Qualité' || user?.role === 'Direction';
}

export function canValidateDirection(user: User | null): boolean {
  return user?.role === 'Direction';
}

export function canDeleteDraft(user: User | null): boolean {
  return canCreate(user);
}

export function canAdmin(user: User | null): boolean {
  return user?.role === 'Direction';
}

export async function listUsers(): Promise<User[]> {
  await ensureUsersSeeded();
  return db.users.toArray();
}
