import { User, UserFormData } from "../types/user";
import { PaginatedResponse } from "../types/common";
import { mockUsers } from "../mock/users";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
let users = [...mockUsers];

export const userService = {
  async list(params?: {
    search?: string;
    departemen?: string;
    role?: string;
    aktif?: boolean;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<User>> {
    await delay(300);
    let result = [...users];

    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (u) =>
          u.nama.toLowerCase().includes(q) ||
          u.nip.includes(q) ||
          u.departemen.toLowerCase().includes(q)
      );
    }
    if (params?.departemen) result = result.filter((u) => u.departemen === params.departemen);
    if (params?.role) result = result.filter((u) => u.role === params.role);
    if (params?.aktif !== undefined) result = result.filter((u) => u.aktif === params.aktif);

    result.sort((a, b) => a.nama.localeCompare(b.nama));
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const total = result.length;
    const totalPages = Math.ceil(total / limit);
    const data = result.slice((page - 1) * limit, page * limit);
    return { data, total, page, limit, total_pages: totalPages };
  },

  async getById(id: string): Promise<User | null> {
    await delay(150);
    return users.find((u) => u.id === id) || null;
  },

  async create(data: UserFormData): Promise<User> {
    await delay(400);
    const now = new Date().toISOString();
    const user: User = {
      id: `USR-${String(users.length + 1).padStart(3, "0")}`,
      ...data,
      created_at: now,
      updated_at: now,
    };
    users.unshift(user);
    return user;
  },

  async update(id: string, data: Partial<UserFormData>): Promise<User> {
    await delay(300);
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) throw new Error("User not found");
    users[idx] = { ...users[idx], ...data, updated_at: new Date().toISOString() };
    return users[idx];
  },

  async getDepartments(): Promise<string[]> {
    await delay(100);
    return [...new Set(users.map((u) => u.departemen))].sort();
  },
};
