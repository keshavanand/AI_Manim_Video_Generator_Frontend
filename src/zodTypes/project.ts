import { z } from 'zod';

/**
 * Schema for creating a new project.
 * All fields are required and must be non-empty strings.
 */
export const ProjectSchema = z.strictObject({
    title: z.string().nonempty(),        // Project title (required, non-empty)
    description: z.string().nonempty(),  // Project description (required, non-empty)
    prompt: z.string().nonempty(),       // Project prompt (required, non-empty)
});

/**
 * Schema for representing a project in a list.
 * 'id' is required, along with non-empty title and description.
 */
export const ProjectsSchema = z.strictObject({
    id: z.string(),                      // Unique project identifier (required)
    title: z.string().nonempty(),        // Project title (required, non-empty)
    description: z.string().nonempty(),  // Project description (required, non-empty)
});

/**
 * Schema for updating a project.
 * Both fields are optional, but if provided, must be strings.
 */
export const UpdateProjectSchema = z.strictObject({
    title: z.string().optional(),        // Optional project title
    description: z.string().optional(),  // Optional project description
});

// Type definitions inferred from schemas
export type Project = z.infer<typeof ProjectSchema>;
export type Projects = z.infer<typeof ProjectsSchema>;
export type UpdateProject = z.infer<typeof UpdateProjectSchema>;