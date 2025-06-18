import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { LoginUserSchema, type LoginUser } from "@/zodTypes/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const { login, loading, error } = useAuth();
    const [user, setUser] = useState<LoginUser>({
        username: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const parseResult = LoginUserSchema.safeParse(user);
        if (!parseResult.success) {
            const errors: Record<string, string> = {};
            parseResult.error.errors.forEach((err) => {
                const field = err.path[0];
                if (typeof field === "string") {
                    errors[field] = err.message;
                }
            });
            setFormErrors(errors);
        } else {
            setFormErrors({});
            await login(user);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#10151c] via-[#18181b] to-[#1a222d]">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-700/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-700/20 rounded-full blur-3xl" />
            </div>
            <form
                onSubmit={handleSubmit}
                className="relative z-10 bg-[#18181b]/90 border border-[#232323] rounded-2xl shadow-xl px-7 py-8 w-full max-w-xs flex flex-col gap-4"
            >
                <div className="flex flex-col items-center mb-2">
                    <span className="text-2xl font-extrabold tracking-tight text-cyan-300 mb-1">
                        MAnim
                    </span>
                    <span className="text-base text-[#b3b3b3]">
                        Sign in to your account
                    </span>
                </div>
                <label
                    className="text-xs text-cyan-200 font-semibold mb-1"
                    htmlFor="username"
                >
                    Username
                </label>
                <Input
                    id="username"
                    type="text"
                    name="username"
                    required
                    autoComplete="username"
                    className="rounded-lg px-3 py-2 bg-[#101012] border border-[#232323] text-white text-sm placeholder:text-[#7dd3fc] focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
                    placeholder="your_username"
                    value={user.username}
                    onChange={handleChange}
                />
                {formErrors.username && (
                    <p className="mt-2 text-sm text-[#fa5252]">
                        {formErrors.username}
                    </p>
                )}
                <label
                    className="text-xs text-cyan-200 font-semibold mb-1"
                    htmlFor="password"
                >
                    Password
                </label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        autoComplete="current-password"
                        className="rounded-lg px-3 py-2 bg-[#101012] border border-[#232323] text-white text-sm placeholder:text-[#7dd3fc] focus:outline-none focus:ring-2 focus:ring-cyan-500/60 w-full"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-2 text-cyan-400 hover:text-cyan-200"
                        tabIndex={-1}
                        onClick={() => setShowPassword((v) => !v)}
                    >
                        {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                        ) : (
                            <Eye className="w-4 h-4" />
                        )}
                    </button>
                </div>
                {formErrors.password && (
                    <p className="mt-2 text-sm text-[#fa5252]">
                        {formErrors.password}
                    </p>
                )}
                {error && (
                    <p className="text-[#fa5252] text-sm text-center">{error}</p>
                )}
                <Button
                    type="submit"
                    disabled={loading}
                    className="mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold px-4 py-2 rounded-lg transition text-sm disabled:opacity-60"
                >
                    <LogIn className="w-4 h-4" />
                    {loading ? "Signing in..." : "Sign In"}
                </Button>
                <div className="flex justify-between mt-2 text-xs">
                    <button
                        type="button"
                        className="text-cyan-400 hover:underline transition"
                        onClick={() => {
                            navigate("/register");
                        }}
                    >
                        Register
                    </button>
                    <button
                        type="button"
                        className="text-cyan-400 hover:underline transition"
                        onClick={() => {
                            /* handle forgot password navigation */
                        }}
                    >
                        Forgot password?
                    </button>
                </div>
            </form>
        </div>
    );
}