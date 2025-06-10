//Zustand stores Project/Scene state
import {create} from 'zustand'
import type { User_data } from '@/zodTypes/user'

interface AuthStore{
    user: User_data | null;
    token: string | null;
    setUser: (user: User_data) => void;
    setToken: (token: string) => void
    clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set)=>({
    user: null,
    token: null,
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    clearAuth: () => set({ user: null, token: null }),
}))