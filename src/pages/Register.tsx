import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import type { RegisterUser } from "@/zodTypes/user";
import { RegisterUserSchema } from "@/zodTypes/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
    const { register, loading, error } = useAuth();
    const [formData, setFormData] = useState<RegisterUser>({
        username: "",
        email: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const parseResult = RegisterUserSchema.safeParse(formData);
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
            await register(formData);
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
                        Create your account
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
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                {formErrors && (
                    <p className="text-[#ff5555] text-sm text-center">{formErrors.username}</p>
                )}
                <label
                    className="text-xs text-cyan-200 font-semibold mb-1"
                    htmlFor="email"
                >
                    Email
                </label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="rounded-lg px-3 py-2 bg-[#101012] border border-[#232323] text-white text-sm placeholder:text-[#7dd3fc] focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={handleChange}
                />
                {formErrors && (
                    <p className="text-[#ff5555] text-sm text-center">{formErrors.email}</p>
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
                        autoComplete="new-password"
                        className="rounded-lg px-3 py-2 bg-[#101012] border border-[#232323] text-white text-sm placeholder:text-[#7dd3fc] focus:outline-none focus:ring-2 focus:ring-cyan-500/60 w-full"
                        placeholder="Password"
                        value={formData.password}
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
                {formErrors && (
                    <p className="text-[#ff5555] text-sm text-center">{formErrors.password}</p>
                )}
                {error && (
                    <p className="text-[#fa5252] text-sm text-center">{error}</p>
                )}
                <Button
                    type="submit"
                    disabled={loading}
                    className="mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold px-4 py-2 rounded-lg transition text-sm disabled:opacity-60"
                >
                    <UserPlus className="w-4 h-4" />
                    {loading ? "Registering..." : "Register"}
                </Button>
                <div className="flex justify-end mt-2 text-xs">
                    <button
                        type="button"
                        className="text-cyan-400 hover:underline transition"
                        onClick={() => {
                            navigate("/login");
                        }}
                    >
                        Already have an account? Login
                    </button>
                </div>
            </form>
        </div>
    );
}