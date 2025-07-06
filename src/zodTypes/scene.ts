import {z} from "zod"

/**
 * Schema for a scene.
 */
export const SceneSchema = z.strictObject({
    id: z.string(),             
    scene_name: z.string(),
    scene_code: z.string().optional(),
    scene_output: z.string(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),     
});

export const CreateSceneSchema = z.strictObject({
    project_id: z.string(),
    scene_prompt: z.string()
})

export type Scene = z.infer<typeof SceneSchema>;
export type CreateScene = z.infer<typeof CreateSceneSchema>;