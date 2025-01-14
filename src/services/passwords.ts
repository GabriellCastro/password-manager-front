import { api } from "./api";
import type { PasswordCardData } from "@/components/PasswordCard";

export const passwordService = {
  getAll: async () => {
    const response = await api.get<PasswordCardData[]>("/password-card");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<PasswordCardData>(`/password-card/${id}`);
    return response.data;
  },

  create: async (data: Omit<PasswordCardData, "id">) => {
    const response = await api.post<PasswordCardData>("/password-card", data);
    return response.data;
  },

  update: async (id: string, data: Omit<PasswordCardData, "id">) => {
    const response = await api.put<PasswordCardData>(
      `/password-card/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/password-card/${id}`);
  },
};
