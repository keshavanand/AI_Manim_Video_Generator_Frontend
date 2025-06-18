import { useAuthStore } from "@/store/states";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";

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

    if (!token || isTokenExpired(token)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <Card className="bg-[#18181b] border border-[#27272a] shadow-lg w-full max-w-md">
                    <CardContent className="flex flex-col items-center py-8">
                        <h2 className="text-white text-2xl font-semibold mb-4">Authentication Required</h2>
                        <p className="text-[#a1a1aa] mb-6 text-center">
                            Please log in to access this page.
                        </p>
                        <Button
                            className="bg-white text-black font-medium hover:bg-[#e5e5e5] transition"
                            asChild
                        >
                            <a href="/login">Go to Login</a>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return <>{children}</>;
}