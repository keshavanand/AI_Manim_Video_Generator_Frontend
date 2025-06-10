import { useAuth } from "@/hooks/useAuth"
import { useState } from "react";
import type { RegisterUser } from "@/zodTypes/user";
import {RegisterUserSchema} from "@/zodTypes/user"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterForm(){
    const {register, loading, error} = useAuth();
    const [formData, setFormData] = useState<RegisterUser>({
        username: '',
        email: '',
        password: ''
    });

    const [formErrors, setFormErrors] = useState<Record<string,string>>({});

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const parseResult = RegisterUserSchema.safeParse(formData);
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
            await register(formData);
            alert("User registered successfully!");
        }     
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
        <Input
            type="text"
            value={formData.username}
            name="username"
            onChange={handleChange}
            placeholder="Username"
            className="input"
        />
        {formErrors.username && <p style={{color: "red"}}>{formErrors.username}</p>}
        <Input
            type="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className="input"
        />
        {formErrors.email && <p style={{color: "red"}}>{formErrors.email}</p>}
        <Input
            type="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="input"
        />
        {formErrors.password && <p style={{color: "red"}}>{formErrors.password}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" disabled={loading} className="btn">
            {loading ? 'Registering...' : 'Register'}
        </Button>
        </form>
    );
}