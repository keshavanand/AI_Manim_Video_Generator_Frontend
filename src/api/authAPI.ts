// authAPI.ts
// API functions for user authentication: register, login, get current user

import instance from "./axiosInstance";
import type { RegisterUser, User_data, LoginUser, Token } from "@/zodTypes/user";

/**
 * Registers a new user.
 * @param data - Registration data for the user.
 * @returns The registered user data.
 */
export async function registerUser(data: RegisterUser): Promise<User_data> {
    const response = await instance.post<User_data>('auth/register/', data);
    return response.data;
}

/**
 * Logs in a user and retrieves an authentication token.
 * @param data - Login credentials.
 * @returns The authentication token.
 */
export async function loginUser(data: LoginUser): Promise<Token> {
    const formData = new URLSearchParams();
    formData.append('username', data.username);
    formData.append('password', data.password);

    const response = await instance.post<Token>(
        '/auth/token',
        formData,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );
    return response.data;
}

/**
 * Retrieves the current authenticated user's data.
 * @param token - Bearer token for authentication.
 * @returns The user data.
 */
export async function getUser(token: string): Promise<User_data> {
    const response = await instance.get<User_data>(
        '/auth/users/me/',
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }
    );
    return response.data;
}