import { useAuthStore } from "@/store/states";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

function isTokenExpired(token?: string): boolean {
    if (!token) return true;
    try {
        const [, payload] = token.split(".");
        const decoded = JSON.parse(atob(payload));
        if (!decoded.exp) return true;
        // exp is in seconds
        return Date.now() >= decoded.exp * 1000;
    } catch {
        return true;
    }
}

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { token } = useAuthStore();
    const navigate = useNavigate();

    if (!token || isTokenExpired(token)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18181b] via-[#232323] to-[#101014]">
                <Card className="bg-[#18181b] border border-[#232323] shadow-xl w-full max-w-sm">
                    <CardContent className="flex flex-col items-center py-6 px-4">
                        <h2 className="text-white text-lg font-semibold mb-3">Authentication Required</h2>
                        <p className="text-[#a1a1aa] mb-5 text-center text-sm">
                            Please log in to access this page.
                        </p>
                        <Button
                            className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium px-4 py-2 rounded text-sm transition"
                            onClick={() => navigate("/login")}
                        >
                            Go to Login
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return <>{children}</>;
}