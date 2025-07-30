import { useAuthStore, useGlobalAuthCheck } from "@/store/states";
import { CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent } from '@/components/ui/dialog';


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
    const { token, alpha_token } = useAuthStore();
    const navigate = useNavigate();
    const {refresh_t} = useAuth()
    const {isTokExpired} = useGlobalAuthCheck()

    const showSessionExpiredDialog = !!(token && alpha_token && isTokenExpired(token));
    const showLoginRequiredDialog = !!(!token || !alpha_token);

    return (
        <>
        {/* Always render the children */}
        {children}

        {/* Session Expired Dialog */}
        <Dialog open={showSessionExpiredDialog || isTokExpired}>
            <DialogContent className="bg-[#18181b] border border-[#232323] shadow-xl w-full max-w-sm backdrop-blur-sm">
            <CardContent className="flex flex-col items-center py-6 px-4">
                <h2 className="text-white text-lg font-semibold mb-3">Session Expired</h2>
                <p className="text-[#a1a1aa] mb-5 text-center text-sm">
                Click the button below to remain active
                </p>
                <Button
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium px-4 py-2 rounded text-sm transition"
                onClick={refresh_t}
                >
                Remain Active
                </Button>
            </CardContent>
            </DialogContent>
        </Dialog>

        {/* Login Required Dialog */}
        <Dialog open={showLoginRequiredDialog}>
            <DialogContent className="bg-[#18181b] border border-[#232323] shadow-xl w-full max-w-sm backdrop-blur-sm">
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
            </DialogContent>
        </Dialog>
        </>
    );
}