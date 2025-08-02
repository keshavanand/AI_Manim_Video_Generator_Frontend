// API functions for project-related endpoints: /projects, /scenes, /render, etc.

import { type CreateProject, type Project, type Projects, type UpdateProject } from "@/zodTypes/project";
import instance from "./axiosInstance";
import { useAuthStore, useGlobalAuthCheck } from "@/store/states";

/**
 * Creates a new project.
 * @param project - The project data to create.
 * @returns The ID of the created project.
 */
export async function createProject(project: CreateProject): Promise<Project> {
    const response = await instance.post<Project>("/project/create_project", project);
    return response.data;
}

export async function editProject(project: CreateProject): Promise<Project> {
    const response = await instance.post<Project>("/project/edit_project", project);
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

export async function enhancePrompt(prompt: string): Promise<Response> {
  const { token, alpha_token } = useAuthStore.getState();
  const baseURL = import.meta.env.VITE_BASE_URL;

  const url = `${baseURL}project/enhance_prompt?prompt=${encodeURIComponent(prompt)}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'X-Custom-Header': 'foobar',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    
  }
  if(alpha_token){
    headers['alpha-token'] = alpha_token;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
  });

  // Optional: handle 401 like your Axios response interceptor
  if (response.status === 401) {
    try {
      const data = await response.json();
      if (data.detail === 'expired') {
        useGlobalAuthCheck.getState().setIsTokExpired(true);
      }
    } catch (err) {
      console.warn("Failed to parse error response", err);
    }
  }

  if (!response.ok) {
    throw new Error(`Enhance prompt failed with status ${response.status}`);
  }

  return response;
}