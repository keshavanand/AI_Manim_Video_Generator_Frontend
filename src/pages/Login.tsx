import { useAuth } from "@/hooks/useAuth"
import { useState } from "react";
import { LoginUserSchema, type LoginUser } from "@/zodTypes/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm(){
    const {login, loading, error} = useAuth();
    const [user, setUser] = useState<LoginUser>({
        username: '',
        password: ''
    });

    const [formErrors, setFormErrors] = useState<Record<string,string>>({});
    
        function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault()
    
            const parseResult = LoginUserSchema.safeParse(user);
            if (!parseResult.success){
                const errors: Record<string, string> = {};
                parseResult.error.errors.forEach(err => {
                    const field = err.path[0];
                    if (typeof field === "string"){
                        errors[field] = err.message;
                    }
                });
                setFormErrors(errors)
            }else{
                setFormErrors({})
                await login(user);
                alert("User registered successfully!");
            }     
        }


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder="Email"
                className="input"
            />        
            {formErrors.username && <p style={{color: "red"}}>{formErrors.username}</p>}
            <Input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Password"
                className="input"
            />
            {formErrors.password && <p style={{color: "red"}}>{formErrors.password}</p>}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" disabled={loading} className="btn">
                {loading ? 'Logging in...' : 'Login'}
            </Button>
        </form>
    );
}