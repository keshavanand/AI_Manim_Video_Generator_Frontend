import { getUser, loginUser, registerUser } from "@/api/authAPI";
import { useAuthStore } from "@/store/states";
import type { LoginUser, RegisterUser } from "@/zodTypes/user";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook for authentication logic.
 */
export function useAuth() {
    const navigate = useNavigate();

    // Auth state and actions from store
    const { user, token, setToken, setUser, clearAuth } = useAuthStore();

    // Local state for loading and error
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Register a new user.
     */
    const register = useCallback(async (data: RegisterUser) => {
        setError(null);
        setLoading(true);
        try {
            const res = await registerUser(data);
            setUser(res);
            navigate("/login");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(error.response?.data?.detail || "Registration Failed");
        } finally {
            setLoading(false);
        }
    }, [navigate, setUser]);

    /**
     * Login user and store token.
     */
    const login = useCallback(async (data: LoginUser) => {
        setError(null);
        setLoading(true);
        try {
            const res = await loginUser(data);
            setToken(res.access_token);
            localStorage.setItem("token", res.access_token);
            navigate("/dashboard");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(error.response?.data?.detail || "Login Failed");
        } finally {
            setLoading(false);
        }
    }, [navigate, setToken]);

    /**
     * Logout user and clear auth state.
     */
    const logout = useCallback(() => {
        clearAuth();
        localStorage.removeItem("token");
    }, [clearAuth]);

    /**
     * Load user from token in localStorage.
     */
    const loadUser = useCallback(async () => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) return;

        try {
            const res = await getUser(storedToken);
            setToken(storedToken);
            setUser(res);
        } catch {
            logout();
        }
    }, [setToken, setUser, logout]);

    // Load user on mount if not present
    useEffect(() => {
        if (!user) loadUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, loadUser]);

    return {
        user,
        token,
        login,
        logout,
        loading,
        error,
        register,
    };
}