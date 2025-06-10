// login, register, getMe
import instance from "./axiosInstance";
import type { RegisterUser, User_data, LoginUser, Token } from "@/zodTypes/user";


export async function registerUser(data: RegisterUser): Promise<User_data>{
    const response = await instance.post<User_data>('auth/register/', data);
    console.log(response)
    return response.data
}

export async function loginUser(data: LoginUser): Promise<Token>{
    const formData = new URLSearchParams();
    formData.append('username', data.username); 
    formData.append('password', data.password);

    const response = await instance.post<Token>('/auth/token', formData,{
         headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    });
    console.log(response)
    return response.data
}

export async function getUser(token: string): Promise<User_data>{
    const response = await instance.get<User_data>('/auth/users/me/',{
         headers: {
       'Authorization': `Bearer ${token}`
     }
    });
    console.log(response)
    return response.data
}