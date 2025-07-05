import z from "zod";

export const ChatMessageSchema = z.strictObject({
    id: z.string(),
    project_id: z.string(),
    role: z.enum(['user', 'assistant']),
    content: z.string().nonempty(),
})

export type ChatHistory = z.infer<typeof ChatMessageSchema>;
