import { useAuthStore } from "@/store/states";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps{
    children: JSX.Element;
}

export default function ProtectedRoute({children}: ProtectedRouteProps){
    const {token} = useAuthStore();

    if (!token){
        alert("Please Login")
        return <Navigate to="/login" replace/>;
    }

    return children
}