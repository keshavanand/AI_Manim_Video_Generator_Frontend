import { getUser, loginUser, registerUser } from "@/api/authAPI";
import { useAuthStore } from "@/store/states";
import type { LoginUser, RegisterUser } from "@/zodTypes/user";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth(){
    const navigate = useNavigate()

    const {user, token, setToken, setUser ,clearAuth} = useAuthStore();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (data: RegisterUser) => {
        try {
            setError("")
            setLoading(true);
            const res = await registerUser(data);
            setUser(res)
            navigate('/login')
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch(error: any){
            setError(error.response?.data?.detail || "Login Failed")
        }
        finally{
            setLoading(false);
        }
    }

    const login = async (data: LoginUser) => {
        try{
            setError("")
            setLoading(true);
            const res = await loginUser(data);
            setToken(res.access_token)
            localStorage.setItem('token',res.access_token)
            navigate('/dashboard')
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch(error: any){
            setError(error.response?.data?.detail || "Login Failed")
        }
        finally{
            setLoading(false);
        }
    }

    const logout = () =>{
        clearAuth();
        localStorage.removeItem('token')
    }

    const loadUser = async () => {
        const token = localStorage.getItem('token');
        if(!token) return;

        try{
            const res = await getUser(token);
            setToken(token)
            setUser(res)
        } catch{
            logout()
        }
    }

    useEffect(() => {
        if(!user) loadUser();
    })

    return {
    user,
    token,
    login,
    logout,
    loading,
    error,
    register
  };
}