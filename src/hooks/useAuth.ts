import { getUser, loginUser, refresh_token, registerUser } from "@/api/authAPI";
import { useAuthStore, useGlobalAuthCheck } from "@/store/states";
import type { LoginUser, RegisterUser } from "@/zodTypes/user";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook for authentication logic.
 */
export function useAuth() {
    const navigate = useNavigate();

    // Auth state and actions from store
    const { user, token,alpha_token, setToken, setAlphaToken, setUser, clearAuth } = useAuthStore();
    const {setIsTokExpired} = useGlobalAuthCheck()
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
            // Try to extract detailed error message from backend response
            const backendDetail = error.response?.data?.detail;
            if (Array.isArray(backendDetail) && backendDetail.length > 0 && backendDetail[0]?.msg) {
                setError(backendDetail[0].msg);
            } else if (typeof backendDetail === "string") {
                setError(backendDetail);
            } else {
                setError("Registration Failed");
            }
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
            setToken(res[0].access_token);
            setAlphaToken(res[1].access_token)
            setIsTokExpired(false)
            navigate("/dashboard");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(error.response?.data?.detail || "Login Failed");
        } finally {
            setLoading(false);
        }
    }, [navigate, setAlphaToken, setIsTokExpired, setToken]);

    /**
     * Logout user and clear auth state.
     */
    const logout = useCallback(() => {
        clearAuth();
        navigate("/login");
    }, [clearAuth, navigate]);

    /**
     * Load user from token in authstore.
     */
    const loadUser = useCallback(async () => {
        const storedToken = token
        if (!storedToken) return;

        try {
            const res = await getUser(storedToken);
            setToken(storedToken);
            setUser(res);
        } catch {
            logout();
        }
    }, [token, setToken, setUser, logout]);

    // Load user on mount if not present
    useEffect(() => {
        if (!user) loadUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, loadUser]);

    const refresh_t = useCallback(async ()=>{
        if (!alpha_token) return;

        try{
            const res = await refresh_token(alpha_token);
            setToken(res.access_token)
            setIsTokExpired(false)
            navigate("/dashboard") 
        }catch{
            navigate("/login")
        }
    },[alpha_token, navigate, setIsTokExpired, setToken])

    return {
        user,
        token,
        login,
        logout,
        loading,
        error,
        register,
        refresh_t
    };
}
