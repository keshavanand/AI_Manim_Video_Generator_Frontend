// Zustand store for managing authentication state (user and token)
import { create } from 'zustand';
import type { User_data } from '@/zodTypes/user';

// Define the shape of the authentication store
interface AuthStore {
    user: User_data | null;
    token: string | null;
    setUser: (user: User_data) => void;
    setToken: (token: string) => void;
    clearAuth: () => void;
}

// Create the Zustand store for authentication
export const useAuthStore = create<AuthStore>((set) => ({
    // Current authenticated user, null if not authenticated
    user: null,
    // Retrieve token from localStorage if available
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    // Set the user object
    setUser: (user) => set({ user }),
    // Set the authentication token
    setToken: (token) => set({ token }),
    // Clear authentication state (logout)
    clearAuth: () => set({ user: null, token: null }),
}));