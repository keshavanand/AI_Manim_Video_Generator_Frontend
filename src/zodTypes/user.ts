/* eslint-disable @typescript-eslint/no-unused-vars */
import {z} from 'zod'

export const UserDataSchema = z.strictObject({
    username: z.string().min(4),
    email: z.string().email("Invalid email address")
})

export const RegisterUserSchema = UserDataSchema.extend({
    password: z.string().min(8)
})

export const LoginUserSchema = z.strictObject({
    username: z.string().min(4),
    password: z.string().min(8)
})

export const TokenSchema = z.strictObject({
    access_token: z.string().jwt(),
    token_type: z.string()
})

export type User_data = z.infer<typeof UserDataSchema>;
export type RegisterUser = z.infer<typeof RegisterUserSchema>;
export type LoginUser = z.infer<typeof LoginUserSchema>;
export type Token = z.infer<typeof TokenSchema>;
