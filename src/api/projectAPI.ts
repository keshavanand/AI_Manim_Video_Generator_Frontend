// API functions for project-related endpoints: /projects, /scenes, /render, etc.

import { type CreateProject, type Project, type Projects, type UpdateProject } from "@/zodTypes/project";
import instance from "./axiosInstance";

/**
 * Creates a new project.
 * @param project - The project data to create.
 * @returns The ID of the created project.
 */
export async function createProject(project: CreateProject): Promise<Project> {
    const response = await instance.post<Project>("/project/create_project", project);
    return response.data;
}

/**
 * Retrieves all projects.
 * @returns An array of projects.
 */
export async function getProjects(): Promise<Projects[]> {
    const response = await instance.get<Projects[]>("/project/get_projects");
    return response.data;
}

/**
 * Updates an existing project.
 * @param id - The ID of the project to update.
 * @param updateData - The data to update the project with.
 * @returns The updated project.
 */
export async function updateProject(id: string, updateData: UpdateProject): Promise<Projects> {
    const response = await instance.put<Projects>(`/project/update_project/${id}`, updateData);
    return response.data;
}

/**
 * Deletes a project.
 * @param id - The ID of the project to delete.
 * @returns A message indicating the result.
 */
export async function deleteProject(id: string): Promise<string> {
    const response = await instance.delete<string>(`/project/delete_project/${id}`);
    return response.data;
}